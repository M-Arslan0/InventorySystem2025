// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true
    },
    categoryCode: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
