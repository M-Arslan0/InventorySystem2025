import express from "express";
import mongoose from "mongoose";
import voucherModel from "../model/voucherModel.js";
import ledgerBookModel from "../model/ledgerBookModel.js";

const voucherController = express.Router();

// 📘 Create Voucher (with ledger entries)
voucherController.post("/createVoucher", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      voucherDate,
      voucherRefNo,
      voucherType,
      debitAccount,
      creditAccount,
      voucherAmount,
      narration,
      accountDebitSource,
      debitParentAccount,
      accountCreditSource,
      creditParentAccount,
    } = req.body;

    // ✅ Step 1: Create Voucher
    const [newVoucher] = await voucherModel.create(
      [
        {
          voucherDate,
          voucherRefNo,
          voucherType,
          debitAccount,
          creditAccount,
          voucherAmount,
          narration,
          isPostedToLedger: true,
        },
      ],
      { session }
    );

    if (!newVoucher) throw new Error("Failed to create voucher");
   //-------------------Ledger Double Entry ------------------
   //Debit To Bank/Cash A/c

    const debitEntry = {
      ledgerDate: voucherDate,
      ledgerAccount: debitParentAccount,
      ledgerEntityId: debitAccount, // e.g. bankId or cashId
      ledgerEntityType: accountDebitSource, // e.g. "Bank" or "Cash"
      referenceId: newVoucher._id,
      referenceModel: "Voucher",
      transectionType: "debit",
      balanceAmount: voucherAmount,
      remarks: `Voucher ${newVoucher.voucherRefNo} (${voucherType}) - Debit`,
    };

   //Credit To Customer A/c
    const creditEntry = {
      ledgerDate: voucherDate,
      ledgerAccount: creditParentAccount,
      ledgerEntityId: creditAccount, // e.g. customerId or supplierId
      ledgerEntityType: accountCreditSource, // e.g. "Customer" or "Supplier"
      referenceId: newVoucher._id,
      referenceModel: "Voucher",
      transectionType: "credit",
      balanceAmount: voucherAmount,
      remarks: `Voucher ${newVoucher.voucherRefNo} (${voucherType}) - Credit`,
    };

    // ✅ Step 3: Post Both Entries
    await ledgerBookModel.create([debitEntry, creditEntry], { session, ordered: true });

    // ✅ Step 4: Commit Transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({message: "Voucher created successfully"});
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("❌ Error creating voucher:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// 📗 Get all vouchers
voucherController.get("/getAllVouchers", async (req, res) => {
  try {
    const vouchers = await voucherModel
      .find()
      .populate("debitAccount", "accountName")
      .populate("creditAccount", "accountName")
      .sort({ createdAt: -1 });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default voucherController;
