// models/permissionModel.js
import mongoose from "mongoose";

const rightsSchema = new mongoose.Schema({
  read: { type: Boolean, default: false },
  write: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
}, { _id: false });

const userPermissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  modules: {
    dashboard: { type: rightsSchema, default: {} },
    materialRequest: { type: rightsSchema, default: {} },
    companyUsers: { type: rightsSchema, default: {} },
    patients: { type: rightsSchema, default: {} },
    product: { type: rightsSchema, default: {} },
    inventory: { type: rightsSchema, default: {} },
    purchase: { type: rightsSchema, default: {} },
    accounts: { type: rightsSchema, default: {} },
    settings: { type: rightsSchema, default: {} },
    employees: { type: rightsSchema, default: {} },
    // add more modules here if needed
  },
}, { timestamps: true });

export default mongoose.model("UserPermission", userPermissionSchema);
