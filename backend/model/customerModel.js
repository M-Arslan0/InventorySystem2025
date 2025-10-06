import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true
        },
        customerAddress: {
            type: String,
            required: true
        },
        customerShippingAddress: {
            type: String,
            required: true
        },
        customerArea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Area",
            required: true
        },
        customerCity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            required: true
        },
        customerType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CusVenType",
            required: true
        },
        customerPhone1: {
            type: String,
            required: true
        },
        customerContactPerson1: {
            type: String,
            required: true
        },
        customerPhone2: {
            type: String
        },
        customerContactPerson2: {
            type: String
        },
        customerPhone3: {
            type: String
        },
        customerContactPerson3: {
            type: String
        },
        customerLedgerAccount: {
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

export default mongoose.model("Customer", customerSchema);
