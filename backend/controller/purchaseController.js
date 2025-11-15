import express from "express";
import mongoose from "mongoose";

import purchaseInvoiceModel from "../model/purchaseInvoiceModel.js";
import purchaseInvoiceProductsModel from "../model/purchaseInvoiceProductsModel.js";

import supplierModel from "../model/supplierModel.js";
import inventoryModel from "../model/inventoryModel.js";
import inventoryLedgerModel from "../model/inventoryLedgerModel.js";
import ledgerBookModel from "../model/ledgerBookModel.js";
import voucherModel from "../model/voucherModel.js";

const purchaseController = express.Router();

purchaseController.post("/createPurchaseInvoice", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { products, supplierId, paidAmount } = req.body;
    console.log(supplierId)
    const supplier = await supplierModel.findById(supplierId).session(session);
    if (!supplier) throw new Error("Supplier not found");

    // Create invoice
    const [invoice] = await purchaseInvoiceModel.insertMany([req.body], { session });

    // Create invoice products
    const invProducts = products.map(p => ({ ...p, purchaseInvId: invoice._id }));
    await purchaseInvoiceProductsModel.insertMany(invProducts, { session });

    // Voucher (if paid)
    let voucher = null;
    if (paidAmount > 0) {
      voucher = await voucherModel.create([{
        voucherDate: new Date(),
        voucherRefNo: new Date().getTime().toString(),
        voucherType: "Payment",
        debitAccount: supplier.ledgerAccount,
        creditAccount: supplier._id,
        voucherAmount: paidAmount,
        narration: `Payment made against Purchase Inv ${invoice.purchaseInvNo}`,
        isPostedToLedger: true,
      }], { session });
    }

    // Ledger Entries
    const ledgerEntries = [
      // Credit Supplier
      {
        ledgerAccount: supplier.ledgerAccount,
        ledgerEntityId: supplierId,
        ledgerEntityType: "Supplier",
        transectionType: "credit",
        balanceAmount: invoice.invoiceAmount,
        referenceId: invoice._id,
        referenceModel: "PurchaseInvoice",
        remarks: `Credit Supplier`,
        ledgerDate: new Date(),
      },

      ...(paidAmount > 0 ? [{
        ledgerAccount: supplier.ledgerAccount,
        ledgerEntityId: supplierId,
        ledgerEntityType: "Supplier",
        transectionType: "debit",
        balanceAmount: paidAmount,
        referenceId: voucher ? voucher[0]._id : null,
        referenceModel: "Voucher",
        remarks: `Payment against invoice`,
        ledgerDate: new Date(),
      }] : []),

      // Debit purchase a/c and increase inventory
      ...products.map(p => ({
        ledgerAccount: p.productPurchaseAc,
        ledgerEntityId: p.productId,
        ledgerEntityType: "Product",
        transectionType: "debit",
        balanceAmount: p.productAmount,
        referenceId: invoice._id,
        referenceModel: "PurchaseInvoice",
        remarks: `Purchase of Product`,
        ledgerDate: new Date(),
      })),
    ];

    await ledgerBookModel.insertMany(ledgerEntries, { session });

    // Stock Increase
    await inventoryModel.bulkWrite(
      products.map((p) => ({
        updateOne: {
          filter: { _id: p.productId },
          update: { $inc: { inQty: p.productQty, currentQty: p.productQty } }
        }
      })),
      { session }
    );

    // Inventory Ledger
    await inventoryLedgerModel.insertMany(
      products.map(p => ({
        productId: p.productId,
        refType: "PurchaseInvoice",
        refId: invoice._id,
        qty: p.productQty,
        rate: p.productRate,
        totalValue: p.productAmount,
        remarks: `Purchased`,
        transDate: new Date(),
      })),
      { session }
    );

    await session.commitTransaction();
    res.json({ success: true });
  } catch (e) {
    console.log(e)
    await session.abortTransaction();
    res.status(500).json({ success: false, message: e.message });
  } finally {
    session.endSession();
  }
});

export default purchaseController;
