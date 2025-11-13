// controllers/productController.js
import express from "express";
import mongoose from "mongoose";
import productModel from "../model/productModel.js";
import inventoryModel from "../model/inventoryModel.js";
import productRateModel from "../model/productRateModel.js";
import inventoryLedgerModel from "../model/inventoryLedgerModel.js";

const productController = express.Router();

productController.post("/createProduct", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {
            productCode,
            productCost,
            productSpRate,
            productWhRate,
            productRtRate,
            minQty,
            maxQty,
            openingQty,
            avgQty
        } = req.body;

        // ✅ Duplicate check
        const existing = await productModel.findOne({ productCode }).session(session);
        if (existing) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Item Code already exists" });
        }

        // ✅ Create Product
        const newProduct = await productModel.create([req.body], { session });
        if (!newProduct) {
            await session.abortTransaction();
            return res.status(500).json({ message: "Product was not created" });
        }

        // ✅ Create Product Rate
        const productRate = await productRateModel.create([{
            productId: newProduct[0]._id,
            productCost,
            productSpRate,
            productWhRate,
            productRtRate,
        }], { session });

        if (!productRate) {
            await session.abortTransaction();
            return res.status(500).json({ message: "Product rate was not created" });
        }

        // ✅ Create Inventory
        const inventoryEntry = await inventoryModel.create([{
            productId: newProduct[0]._id,
            minQty,
            maxQty,
            openingQty,
            avgQty,
        }], { session });

        if (!inventoryEntry) {
            await session.abortTransaction();
            return res.status(500).json({ message: "Inventory was not created" });
        }

        // ✅ Create Stock Movement for Opening Balance
        if (openingQty > 0) {
            await inventoryLedgerModel.create([{
                productId: newProduct[0]._id,
                refType: "Opening",
                refId: newProduct[0]._id, // reference to product itself
                transDate: new Date(),
                qty: openingQty, // +ve for In
                rate: productCost || 0,
                totalValue: (productCost || 0) * openingQty,
                remarks: "Opening stock",
            }], { session });
        }

        // ✅ Commit Transaction
        await session.commitTransaction();
        res.status(201).json({ message: "Product created successfully" });

    } catch (error) {
        await session.abortTransaction();
        console.error("❌ Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});

// ✅ Get All Products
productController.get("/getAllProducts", async (req, res) => {
    try {
        const products = await inventoryModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "brands",
                    localField: "products.brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "productrates",
                    localField: "products._id",
                    foreignField: "productId",
                    as: "productRates"
                }
            },
            { $unwind: { path: "$productRates", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "categories",
                    localField: "products.category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "packingsizes",
                    localField: "products.packingSize",
                    foreignField: "_id",
                    as: "packingSize"
                }
            },
            { $unwind: { path: "$packingSize", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "uoms",
                    localField: "products.uom",
                    foreignField: "_id",
                    as: "uom"
                }
            },
            { $unwind: { path: "$uom", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    _id: 1,
                    productCost: "$productRates.productCost",
                    productSpRate: "$productRates.productSpRate",
                    productWhRate: "$productRates.productWhRate",
                    productRtRate: "$productRates.productRtRate",
                    currentQty: 1,
                    productId: "$products._id",
                    productCode: "$products.productCode",
                    productName: "$products.productName",
                    productArt: "$products.productArt",
                    productBrandId: "$brand._id",
                    productBrand: "$brand.brandName",
                    productCatId: "$category._id",
                    productCat: "$category.categoryName",
                    productPacking: "$packingSize.packingSizeName",
                    productUOM: "$uom.uomName",
                }
            }
        ])
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Get All Products For Sales
productController.get("/getAllProductsForSales", async (req, res) => {
    try {
        const products = await inventoryModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "brands",
                    localField: "products.productBrand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "productrates",
                    localField: "products._id",
                    foreignField: "productId",
                    as: "productRates"
                }
            },
            { $unwind: { path: "$productRates", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "categories",
                    localField: "products.productCategory",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "packingsizes",
                    localField: "products.productPackSize",
                    foreignField: "_id",
                    as: "packingSize"
                }
            },
            { $unwind: { path: "$packingSize", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "uoms",
                    localField: "products.productUOM",
                    foreignField: "_id",
                    as: "uom"
                }
            },
            { $unwind: { path: "$uom", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    _id: 1,
                    productCostRate: "$productRates.productCost",
                    productSpRate: "$productRates.productSpRate",
                    productWhRate: "$productRates.productWhRate",
                    productRtRate: "$productRates.productRtRate",
                    currentQty: 1,
                    productId: "$products._id",
                    productCode: "$products.productCode",
                    productName: "$products.productName",
                    productArt: "$products.productArtNo",
                    productBrandId: "$brand._id",
                    productBrand: "$brand.brandName",
                    productCatId: "$category._id",
                    productCat: "$category.categoryName",
                    productPacking: "$packingSize.packingSizeName",
                    productUOM: "$uom.uomName",
                    //A/c
                    productSaleAc: "$products.saleAccount",
                    productPurchaseAc: "$products.purchaseAccount",
                    productInventoryAc: "$products.inventoryAccount",
                    productCogsAc: "$products.cogsAccount",
                }
            }
        ])
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Get Single Product
productController.get("/getProduct/:id", async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.id)
            .populate("brand")
            .populate("category")
            .populate("packingSize")
            .populate("uom")
            .populate("saleAccount")
            .populate("purchaseAccount")
            .populate("inventoryAccount");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.error("❌ Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Update Product
productController.put("/updateProduct/:id", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true, session }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        await session.commitTransaction();
        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        await session.abortTransaction();
        console.error("❌ Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});

// ✅ Delete Product
productController.delete("/deleteProduct/:id", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id, {
            session,
        });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        await session.commitTransaction();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        await session.abortTransaction();
        console.error("❌ Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});

export default productController;
