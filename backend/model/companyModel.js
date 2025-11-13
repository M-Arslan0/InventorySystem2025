import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    ntn: {
        type: String,
    },
    stn: {
        type: String,
    },

    phone: {
        type: String,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
    },
    website: {
        type: String,

    },

}, { timestamps: true });

const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
