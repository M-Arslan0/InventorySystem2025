import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    // 🔹 Bank basic info
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    brandCode: {
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

export default mongoose.model("Brand", brandSchema);

