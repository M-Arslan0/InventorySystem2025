import mongoose from "mongoose";

const cusVenTypeSchema = new mongoose.Schema(
    {
        typeCode: {
            type:String,
            required: true
        },
        typeName: {
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

export default mongoose.model("CusVenType", cusVenTypeSchema);
