// model/inventoryModel.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

     // 🔹 Stock Control Levels
    minQty: { type: Number, default: 0 }, // reorder level
    maxQty: { type: Number, default: 0 }, // storage limit
    openingQty: { type: Number, default: 0 },
    inQty: { type: Number, default: 0 },
    outQty: { type: Number, default: 0 },
    currentQty: { type: Number, default: 0 },
    avgQty: { type: Number, default: 0 },

    // 🔹 Status & Audit
    isActive: { type: Boolean, default: true },
    /* createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, */
  },
  { timestamps: true }
);

// 🔸 Auto-calculate currentQty before save
inventorySchema.pre("save", function (next) {
  this.currentQty = this.openingQty + this.inQty - this.outQty;
  next();
});

export default mongoose.model("Inventory", inventorySchema);
