import express from "express";
import mongoose from "mongoose";
import bankModel from "../model/bankModel.js";
import chartOfAccountEntryUtil from "../util/chartOfAccountEntryUtil.js";

const bankController = express.Router();

// ✅ Create Bank
bankController.post("/createBank", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [newBank] = await bankModel.create(
      [{ ...req.body }],
      { session }
    );

    if (!newBank) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create Bank" });
    }

    //-------------------Account Entry ------------------
    const accountData = {
      accountGroupId: newBank.ledgerAccount,
      accountSource: "Bank",
      accountChildId: newBank._id,
    }

    const accountEntry = await chartOfAccountEntryUtil(accountData, session)
    if (!accountEntry) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create account entry" });
    }
    // ✅ 3. Commit the transaction
    await session.commitTransaction();
    res.status(201).json({ message: "Bank created successfully", bank: newBank });
  } catch (error) {
    console.error("Error creating bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get All Banks
bankController.get("/getAllBanks", async (req, res) => {
  try {
    const banks = await bankModel.find().populate("ledgerAccount").sort({ createdAt: -1 });
    res.status(200).json(banks);
  } catch (error) {
    console.error("Error fetching banks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get Single Bank
bankController.get("/getBank/:id", async (req, res) => {
  try {
    const bank = await bankModel.findById(req.params.id);
    if (!bank) return res.status(404).json({ message: "Bank not found" });
    res.status(200).json(bank);
  } catch (error) {
    console.error("Error fetching bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Update Bank
bankController.put("/updateBank/:id", async (req, res) => {
  try {
    const updatedBank = await bankModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBank) return res.status(404).json({ message: "Bank not found" });
    res.status(200).json({ message: "Bank updated successfully", bank: updatedBank });
  } catch (error) {
    console.error("Error updating bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Delete Bank
bankController.delete("/deleteBank/:id", async (req, res) => {
  try {
    const deletedBank = await bankModel.findByIdAndDelete(req.params.id);
    if (!deletedBank) return res.status(404).json({ message: "Bank not found" });
    res.status(200).json({ message: "Bank deleted successfully" });
  } catch (error) {
    console.error("Error deleting bank:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default bankController;
