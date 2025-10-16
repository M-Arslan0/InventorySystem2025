import express from "express";
import mongoose from "mongoose";
import customerModel from "../model/customerModel.js";
import ledgerEntryUtil from "../util/ledgerEntryUtil.js";
import voucherEntryUtil from "../util/voucherEntryUtil.js";
import chartOfAccountEntryUtil from "../util/chartOfAccountEntryUtil.js";

const customerController = express.Router()

customerController.post("/createCustomer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { customerOpeningBalance, customerOpeningBalanceAcc } = req.body;
    // ✅ 1. Create customer inside transaction
    const [newCustomer] = await customerModel.create(
      [{ ...req.body }],
      { session }
    );

    if (!newCustomer) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create customer" });
    }

      //-------------------Account Entry ------------------
    const accountData = {
      accountGroupId:newCustomer.ledgerAccount,
      accountSource: "Customer",
      accountChildId: newCustomer._id,
    }

    const accountEntry = await chartOfAccountEntryUtil(accountData, session)
    if (!accountEntry) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create account entry" });
    }

    //-------------------Voucher Entry ------------------
    const voucherData = {
      ledgerDate: new Date(),
      voucherRefNo: "Vouc-11",
      voucherType: "Journal",
      narration: "Customer Opening Balance",
      debitAccount: newCustomer.ledgerAccount,
      creditAccount: customerOpeningBalanceAcc,
      voucherAmount: customerOpeningBalance || 0,
      isPostedToLedger: true,
    }

    const voucherEntry = await voucherEntryUtil(voucherData, session)
    if (!voucherEntry) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to create voucher entry"});
    }

    //-------------------Ledger Double Entry ------------------
    //debit to Customer Ledger Account

    const ledgerDebitEntry = {
      ledgerDate: new Date(),
      ledgerAccount: newCustomer.ledgerAccount, //Parent A/c of Customer Ledger
      ledgerEntityType: "Customer",
      ledgerEntityId: newCustomer._id,//Customer Id
      referenceModel:"Voucher",
      referenceId:voucherEntry._id,
      transectionType: "debit",
      balanceAmount: voucherEntry.voucherAmount || 0,
      remarks: "Customer Opening Balance",
    }
    //credit to Opening Balance Account
    const ledgerCreditEntry = {
      ledgerDate: new Date(),
      ledgerAccount: customerOpeningBalanceAcc,
      ledgerEntityType: "Customer",
      ledgerEntityId: newCustomer._id,
      referenceModel:"Voucher",
      referenceId:voucherEntry._id,
      transectionType: "credit",
      balanceAmount: voucherEntry.voucherAmount || 0,
      remarks: "Customer Opening Balance",
    }

    // ✅ 2. Create Ledger Entry for opening balance
    const ledgerEntry = await ledgerEntryUtil(ledgerDebitEntry, ledgerCreditEntry, session);
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
    const customers = await customerModel.find().sort({ customerName: 1 });
    res.status(200).json(customers);
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});




export default customerController;