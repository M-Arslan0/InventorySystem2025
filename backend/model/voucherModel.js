import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  voucherDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

 voucherRefNo: {
    type: String,
    required: true,
  },
  voucherType: {
    type: String,
    enum: ["Receipt", "Payment", "Journal", "Contra"],
    required: true,
  },

  narration: {
    type: String,
    default: "",
  },

  // Linked accounts
  debitAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },

  creditAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },

  voucherAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  isPostedToLedger: {
    type: Boolean,
    default: false
  },

/*   createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, */
}, { timestamps: true });

export default mongoose.model("Voucher", voucherSchema);
