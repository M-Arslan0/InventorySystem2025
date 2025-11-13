import express from "express";
import mongoose from "mongoose";
import salesInvoiceModel from "../model/salesInvoiceModel.js";
import salesInvoiceProductsModel from "../model/salesInvoiceProductsModel.js";
import ledgerBookModel from "../model/ledgerBookModel.js";
import voucherModel from "../model/voucherModel.js";
import inventoryModel from "../model/inventoryModel.js";
import inventoryLedgerModel from "../model/inventoryLedgerModel.js";
import ledgerEntryUtil from "../util/ledgerEntryUtil.js";
import customerModel from "../model/customerModel.js";

const salesController = express.Router();

salesController.post("/createSalesInvoice", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { products, customerId } = req.body;

        // ✅ Check customer
        const customer = await customerModel.findById(customerId).session(session);
        if (!customer) throw new Error("Customer does not exist");

        // ✅ Check stock
        for (let p of products) {
            const inventory = await inventoryModel.findById(p.productId).session(session);
            console.log(inventory);
            if (!inventory) throw new Error(`Product not found: ${p.productName}`);
            if (Number(inventory.currentQty) < Number(p.productQty)) throw new Error(`Insufficient stock for ${p.productName}`);
        }

        // ✅ Create Sales Invoice & Products
        const [invoice] = await salesInvoiceModel.insertMany([req.body], { session });
        const invoiceProducts = products.map(p => ({ ...p, salesInvId: invoice._id }));
        await salesInvoiceProductsModel.insertMany(invoiceProducts, { session });

        // ✅ Ledger Entries
        const ledgerEntries = [
            // Debit Customer
            {
                ledgerDate: new Date(),
                ledgerAccount: customer.ledgerAccount,
                ledgerEntityId: customer._id,
                ledgerEntityType: "Customer",
                referenceId: invoice._id,
                referenceModel: "SalesInvoice",
                transectionType: "debit",
                balanceAmount: invoice.invoiceAmount,
                remarks: `Sales Invoice ${invoice.salesInvNo} - Debit`,
            },
            // Credit each product sales A/C
            ...products.map(p => ({
                ledgerDate: new Date(),
                ledgerAccount: p.productSaleAc,
                ledgerEntityId: p.productId,
                ledgerEntityType: "Product",
                referenceId: invoice._id,
                referenceModel: "SalesInvoice",
                transectionType: "credit",
                balanceAmount: p.productAmount,
                remarks: `Sales Invoice ${invoice.salesInvNo} - Credit ${p.productName}`,
            }))
        ];
        await ledgerBookModel.insertMany(ledgerEntries, { session });

        // ✅ Inventory Update
        const bulkOps = products.map(p => ({
            updateOne: {
                filter: { _id: p.productId },
                update: { $inc: { outQty: p.productQty, currentQty: -p.productQty} }
            }
        }));
        await inventoryModel.bulkWrite(bulkOps, { session });

        // ✅ Inventory Ledger
        const inventoryLedgerEntries = products.map(p => ({
            productId: p.productId,
            refType: "SalesInvoice",
            refId: invoice._id,
            transDate: new Date(),
            qty: -p.productQty,
            rate: p.productRate,
            totalValue: p.productAmount,
            remarks: `Sold ${p.productQty} units of ${p.productName} in Invoice ${invoice.salesInvNo}`,
        }));
        await inventoryLedgerModel.insertMany(inventoryLedgerEntries, { session });

        await session.commitTransaction();
        res.status(200).json({ success: true, invoiceId: invoice._id });

    } catch (error) {
        await session.abortTransaction();
        console.error("Error creating sales invoice:", error);
        res.status(500).json({ success: false, message: error.message });
    } finally {
        await session.endSession();
    }
});

export default salesController;