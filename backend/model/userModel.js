// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userPassword: {
    type: String,
    required: true
  }, // hash in production
  status: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
