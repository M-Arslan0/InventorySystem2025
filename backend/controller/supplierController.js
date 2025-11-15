import express from "express";
import mongoose from "mongoose";
import supplierModel from "../model/supplierModel.js";
import ledgerEntryUtil from "../util/ledgerEntryUtil.js";
import voucherEntryUtil from "../util/voucherEntryUtil.js";
import chartOfAccountEntryUtil from "../util/chartOfAccountEntryUtil.js";

const supplierController = express.Router();

supplierController.post("/createSupplier", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { supplierOpeningBalance, supplierOpeningBalanceAcc } = req.body;

    // ✅ 1. Create supplier inside transaction
    const [newSupplier] = await supplierModel.create(
      [{ ...req.body }],
      { session }
    );

    if (!newSupplier) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create supplier" });
    }

    // ------------------- Account Entry ------------------
    const accountData = {
      accountGroupId: newSupplier.ledgerAccount,
      accountSource: "Supplier",
      accountChildId: newSupplier._id,
    };

    const accountEntry = await chartOfAccountEntryUtil(accountData, session);
    if (!accountEntry) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create account entry" });
    }

    // ------------------- Voucher Entry ------------------
    const voucherData = {
      voucherDate: new Date(),
      voucherRefNo: "Vouc-11",
      voucherType: "Journal",
      narration: "Supplier Opening Balance",
      debitAccount: supplierOpeningBalanceAcc,
      creditAccount: newSupplier.ledgerAccount,
      voucherAmount: supplierOpeningBalance || 0,
      isPostedToLedger: true,
    };

    const voucherEntry = await voucherEntryUtil(voucherData, session);
    if (!voucherEntry) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create voucher entry" });
    }

    // ------------------- Ledger Double Entry ------------------
    // Debit the Opening Balance Account
    const ledgerDebitEntry = {
      ledgerDate: new Date(),
      ledgerAccount: supplierOpeningBalanceAcc,
      ledgerEntityType: "Supplier",
      ledgerEntityId: newSupplier._id,
      referenceModel: "Voucher",
      referenceId: voucherEntry._id,
      transectionType: "debit",
      balanceAmount: voucherEntry.voucherAmount || 0,
      remarks: "Supplier Opening Balance",
    };

    // Credit Supplier Ledger Account
    const ledgerCreditEntry = {
      ledgerDate: new Date(),
      ledgerAccount: newSupplier.ledgerAccount,
      ledgerEntityType: "Supplier",
      ledgerEntityId: newSupplier._id,
      referenceModel: "Voucher",
      referenceId: voucherEntry._id,
      transectionType: "credit",
      balanceAmount: voucherEntry.voucherAmount || 0,
      remarks: "Supplier Opening Balance",
    };

    // Create ledger double entry
    const ledgerEntry = await ledgerEntryUtil(
      ledgerDebitEntry,
      ledgerCreditEntry,
      session
    );

    if (!ledgerEntry) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Failed to create ledger entry" });
    }

    // ✅ Commit
    await session.commitTransaction();
    res.status(201).json({
      message: "Supplier created successfully with opening balance ledger entry",
      supplier: newSupplier,
    });

  } catch (error) {
    console.error("❌ Error creating supplier:", error);
    await session.abortTransaction();
    res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
});

// ======================== GET ALL Suppliers ========================
supplierController.get("/getAllSuppliers", async (req, res) => {
  try {
    const suppliers = await supplierModel.find().sort({ supplierName: 1 });
    res.status(200).json(suppliers);
  } catch (error) {
    console.error("❌ Error fetching suppliers:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default supplierController;
