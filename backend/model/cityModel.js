import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
    {
        cityCode: {
            type:String,
            required: true
        },
        cityName: {
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

export default mongoose.model("City", citySchema);
