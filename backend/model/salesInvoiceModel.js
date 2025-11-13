// models/StockMovement.js
import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema(
    {
        salesInvNo: {
            type: String,
            required: [true, "Sales Invoice Number is required"],
        },
        salesInvDate: {
            type: Date,
            required: [true, "Sales Invoice Date is required"],
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Customer reference is required"],
        },
        invoiceAmount: {
            type: Number,
            required: [true, "Invoice Amount is required"],
            min: [0, "Invoice Amount cannot be negative"],
        },
        isHold: {
            type: Boolean,
            default: false,
        },
        isUnpaid: {
            type: Boolean,
            default: false,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
);



export default mongoose.model("SalesInvoice", salesInvoiceSchema);
