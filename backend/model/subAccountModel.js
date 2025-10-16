import mongoose from "mongoose";

const subAccountSchema = new mongoose.Schema(
    {
        subAccountName: {
            type: String,
            required: true,
        },
        parentAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        description: {
            String
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("SubAccount", subAccountSchema);
