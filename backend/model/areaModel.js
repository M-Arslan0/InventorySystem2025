import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
    {
        areaCode: {
            type:String,
            required: true
        },
        areaName: {
            type:String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true }
);

export default mongoose.model("Area", areaSchema);
