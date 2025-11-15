import mongoose from "mongoose";

const LedgerBookSchema = new mongoose.Schema({
  ledgerDate: {
    type: Date,
    required: true,
  },
  ledgerAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  // Dynamic reference for the entity (e.g., client, product)
  ledgerEntityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "ledgerEntityType",
  },
   // Dynamic reference for the entity (e.g., client, product)
  ledgerEntityType: {
    type: String,
    required: true,
    enum: ["Customer","Supplier","Product", "Bank", "SubAccount"],
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "referenceModel",
  },
    referenceModel: {
    type: String,
    required: true,
    enum: ["Voucher","Account","Product", "SalesInvoice", "PurchaseInvoice"],
  },
  transectionType: {
    type: String,
    enum: ["debit", "credit"],
    required: true,
  },
  balanceAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  amountPaid: {
    type: Number,
    min: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  isPartial: {
    type: Boolean,
    default: false,
  },
  remarks: {
    type: String,
    default: "",
  },

}, { timestamps: true });


export default mongoose.model("LedgerBook", LedgerBookSchema);
