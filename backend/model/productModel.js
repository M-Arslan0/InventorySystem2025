// model/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Product
    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    productBarCode: {
      type: String,
      required: true,
      trim: true
    },
    productBrand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productType: {
      type: String,
      enum: ["Local", "Import", "Company"],
      default: "Local"
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    productArtNo: {
      type: String,
      trim: true
    },

    // 🔹 Linked References
    productPackSize: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PackingSize",
      required: true,
    },
    productUOM: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UOM",
      required: true,
    },

    // 🔹 Linked Accounts
    saleAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    purchaseAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    inventoryAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    cogsAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    // 🔹 System Flags
    isActive: { type: Boolean, default: true },

    // 🔹 Audit Info
    /*  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, */
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
