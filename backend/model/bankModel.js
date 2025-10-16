import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    // 🔹 Bank basic info
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    bankBranchCode: {
      type: String,
      trim: true,
    },
    bankAddress: {
      type: String,
    },
    accountTitle: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bankIBAN: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // 🔹 Ledger integration
    ledgerAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", // connected with accounts collection
      required: true,
    },
    bankNote: {
      type: String,
      trim: true,
    },

    // 🔹 System fields
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bank", bankSchema);

