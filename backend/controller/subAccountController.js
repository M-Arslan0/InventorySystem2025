import express from "express";
import mongoose from "mongoose";
import subAccountModel from "../model/subAccountModel.js";
import chartOfAccountEntryUtil from "../util/chartOfAccountEntryUtil.js";

const subAccountController = express.Router();

// Create a new sub-account
subAccountController.post("/createSubAccount", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [newSubAccount] = await subAccountModel.create(
      [{ ...req.body }],
      { session }
    );
    if (!newSubAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create sub-account" });
    }

    //-------------------Account Entry ------------------
    const accountData = {
      accountGroupId: newSubAccount.parentAccount,
      accountSource: "SubAccount",
      accountChildId: newSubAccount._id,
    }

    const accountEntry = await chartOfAccountEntryUtil(accountData, session)
    if (!accountEntry) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create account entry" });
    }
    await session.commitTransaction();
    res.status(201).json({ message: "Sub-account created successfully" });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error creating sub-account:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
});

// Get all sub-accounts
subAccountController.get("/getAllSubAccounts", async (req, res) => {
  try {
    const accounts = await subAccountModel.find().populate('parentAccount', 'accountName accountNature accountType');
    res.status(200).json({ accounts });
  } catch (error) {
    console.error("Error fetching sub-accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Get single sub-account by ID
subAccountController.get("/getSubAccount/:id", async (req, res) => {
  try {
    const subAccount = await subAccountModel.findById(req.params.id);
    if (!subAccount) {
      return res.status(404).json({ message: "Sub-account not found" });
    }
    res.status(200).json({ subAccount });
  } catch (error) {
    console.error("Error fetching sub-account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update sub-account
subAccountController.put("/updateSubAccount/:id", async (req, res) => {
  try {
    const updatedSubAccount = await subAccountModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSubAccount) {
      return res.status(404).json({ message: "Sub-account not found" });
    }
    res.status(200).json({ message: "Sub-account updated successfully", subAccount: updatedSubAccount });
  } catch (error) {
    console.error("Error updating sub-account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete sub-account
subAccountController.delete("/deleteSubAccount/:id", async (req, res) => {
  try {
    const deletedSubAccount = await subAccountModel.findByIdAndDelete(req.params.id);
    if (!deletedSubAccount) {
      return res.status(404).json({ message: "Sub-account not found" });
    }
    res.status(200).json({ message: "Sub-account deleted successfully" });
  } catch (error) {
    console.error("Error deleting sub-account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default subAccountController;
