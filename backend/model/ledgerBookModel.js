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
  ledgerEntityType: {
    type: String,
    required: true,
    enum: ["Customer", "ProductData"],
  },
  ledgerEntityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "ledgerEntityType",
  },

  // Dynamic reference for the transaction source (e.g., Invoice, Payment)
 /*  referenceModel: {
    type: String,
    required: true,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "referenceModel",
  }, */

  transectionType: {
    type: String,
    enum: ["debit", "credit"],
    required: true,
  },
  amount: {
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
    required: true,
  },

  isPartial: {
    type: Boolean,
    required: true,
  },

  remarks: {
    type: String,
    default: "",
  },

}, { timestamps: true });


export default mongoose.model("LedgerBook", LedgerBookSchema);
