// models/StockMovement.js
import mongoose from "mongoose";

const productRateSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    productCost: {
      type: Number,
      required: [true, "Product cost is required"],
    },
    productSpRate: {
      type: Number,
      required: [true, "Product Special Rate is required"],
    },
    productWhRate: {
      type: Number,
      required: [true, "Product Wholesale Rate is required"],
    },
    productRtRate: {
      type: Number,
      required: [true, "Product Retail Rate is required"],
    },
  },
  { timestamps: true }
);


export default mongoose.model("ProductRate", productRateSchema);
