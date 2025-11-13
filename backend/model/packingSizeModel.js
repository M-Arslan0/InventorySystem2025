import mongoose from "mongoose";

const packingSizeSchema = new mongoose.Schema(
  {
    packingSizeName: {
      type: String,
      required: true,
      trim: true,
    },
    packingSizeCode: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PackingSize", packingSizeSchema);
