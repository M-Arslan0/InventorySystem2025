import express from "express";
import mongoose from "mongoose";
import CustomerModel from "../model/customerModel.js";
import ledgerEntryUtil from "../util/ledgerEntryUtil.js";

const customerController = express.Router()

customerController.post("/createCustomer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { customerOpeningBalance } = req.body;
    console.log(req.body)
    // ✅ 1. Create customer inside transaction
    const [newCustomer] = await CustomerModel.create(
      [{ ...req.body }],
      { session }
    );

    if (!newCustomer) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create customer" });
    }

    const ledgerData = {
        ledgerDate: new Date(),
        ledgerAccount: newCustomer.customerLedgerAccount,
        ledgerEntityType: "Customer",
        ledgerEntityId: newCustomer._id,
        transectionType: "credit",
        amount: customerOpeningBalance || 0,
        isPaid: false,
        isPartial: false,
        remarks: "Customer Opening Balance",
      }

    // ✅ 2. Create Ledger Entry for opening balance
    const ledgerEntry = await ledgerEntryUtil(ledgerData,session);
    if (!ledgerEntry) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create ledger entry" });
    }

    // ✅ 3. Commit the transaction
    await session.commitTransaction();
    res.status(201).json({
      message: "Customer created successfully with opening balance ledger entry",
      customer: newCustomer,
    });
  } catch (error) {
    console.error("❌ Error creating customer:", error);
    await session.abortTransaction();
    res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
});

customerController.get("/getAllCustomers", async (req, res) => {
  try {
    const customers = await CustomerModel.find().populate("customerArea").populate("customerCity").populate("customerType").populate("customerLedgerAccount");
    res.status(200).json({ customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default customerController;