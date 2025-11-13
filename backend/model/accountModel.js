import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
      trim: true,
    },
    accountDescription: {
      type: String,
      default: "",
    },
    accountNature: {
      type: String,
      enum: ["Asset", "Liability", "Equity", "Revenue", "Expense"],
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Stock","Receivable", "Payable","Bank", "Capital", "Income", "Expense","Sales"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
