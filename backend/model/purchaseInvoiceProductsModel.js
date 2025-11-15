// models/StockMovement.js
import mongoose from "mongoose";

const purchaseInvoiceProductsSchema = new mongoose.Schema(
    {
        purchaseInvId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseInvoice",
            required: [true, "Purchase Invoice reference is required"],
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product reference is required"],
        },
        productQty: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Quantity cannot be negative"],
        },
        productRate: {
            type: Number,
            required: [true, "Rate is required"],
            min: [0, "Rate cannot be negative"],
        },
        productAmount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0, "Amount cannot be negative"],
        },
    },
    { timestamps: true }
);



export default mongoose.model("PurchaseInvoiceProducts", purchaseInvoiceProductsSchema);
