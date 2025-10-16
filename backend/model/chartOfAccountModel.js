import mongoose from "mongoose";

const ChartOfAccount = new mongoose.Schema({

    accountGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },

    accountSource: {
        type: String,
        required: true,
    },

    accountChildId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "accountSource",
        required: true,
    },

 /*    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        required: true
    } */
}, { timestamps: true });

export default mongoose.model("ChartOfAccount", ChartOfAccount);
