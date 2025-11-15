import mongoose from "mongoose";

const purchaseInvoiceSchema = new mongoose.Schema(
  {
    purchaseInvNo: {
      type: String,
      required: [true, "purchase Invoice Number is required"],
    },
    purchaseInvDate: {
      type: Date,
      required: [true, "purchase Invoice Date is required"],
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Supplier reference is required"],
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

export default mongoose.model("PurchaseInvoice", purchaseInvoiceSchema);
