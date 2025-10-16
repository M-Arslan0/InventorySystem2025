import mongoose from "mongoose";

const uomSchema = new mongoose.Schema(
  {
    uomName: {
      type: String,
      required: true,
      trim: true,
    },
    uomCode: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UOM", uomSchema);
