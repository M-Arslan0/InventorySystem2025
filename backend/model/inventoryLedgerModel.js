// models/StockMovement.js
import mongoose from "mongoose";

const inventoryLedgerSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        refType: {
            type: String,
            enum: ["PurchaseInvoice", "SalesInvoice", "Adjustment", "Return", "Opening"],
            required: true,
        },
        refId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "refType",
            required: true,
        },
        transDate: {
            type: Date,
            default: Date.now,
        },
        qty: {
            type: Number,
            required: true,
        }, // +ve for In, -ve for Out
        rate: {
            type: Number,
            required: true,
        },
        totalValue: {
            type: Number,
            required: true,
        },
        remarks: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("inventoryLedger", inventoryLedgerSchema);
