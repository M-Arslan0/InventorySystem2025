import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
    {
        supplierName: {
            type: String,
            required: true
        },
        supplierAddress: {
            type: String,
            required: true
        },
        supplierShippingAddress: {
            type: String,
            required: true
        },
        supplierArea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Area",
            required: true
        },
        supplierCity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            required: true
        },
        supplierType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CusVenType",
            required: true
        },
        supplierPhone1: {
            type: String,
            required: true
        },
        supplierContactPerson1: {
            type: String,
            required: true
        },
        supplierPhone2: {
            type: String
        },
        supplierContactPerson2: {
            type: String
        },
        supplierPhone3: {
            type: String
        },
        supplierContactPerson3: {
            type: String
        },
        ledgerAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);
