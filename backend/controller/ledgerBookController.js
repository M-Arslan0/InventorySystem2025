import express from "express";
import ledgerBookModel from "../model/ledgerBookModel.js";
import mongoose from "mongoose";
import customerModel from "../model/customerModel.js";

const ledgerController = express.Router();

/* ────────────────────────────────
   🟢 Create Ledger Entry
──────────────────────────────── */
ledgerController.post("/createLedgerEntry", async (req, res) => {
  try {
    const newLedger = await ledgerBookModel.create(req.body);

    if (!newLedger) {
      return res.status(400).json({ message: "Failed to create ledger entry" });
    }

    res.status(201).json({
      message: "Ledger entry created successfully",
      ledger: newLedger,
    });
  } catch (error) {
    console.error("Error creating ledger entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ────────────────────────────────
   🟡 Get All Ledger Entries
──────────────────────────────── */
ledgerController.get("/getAllLedgers", async (req, res) => {
  try {
    const ledgers = await ledgerBookModel
      .find()
      .populate("ledgerAccount ledgerEntityId") // populate accounts and linked entities (like Customer, Vendor)
      .sort({ ledgerDate: -1 }); // latest first

    res.status(200).json({ ledgers });
  } catch (error) {
    console.error("Error fetching ledger entries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ────────────────────────────────
   🟠 Get Single Ledger by ID
──────────────────────────────── */
ledgerController.get("/getLedgerBy/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { ledgerEntityType } = req.query

    const entityModel = mongoose.model(ledgerEntityType);
    const entityData = await entityModel.findById(id)
    if (!entityData) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const ledger = await ledgerBookModel
      .find({ $and: [{ ledgerEntityId: id }, { ledgerAccount: entityData.ledgerAccount }] }).populate("ledgerAccount").populate("referenceId");
    if (!ledger) {
      return res.status(404).json({ message: "Ledger entry not found" });
    }
    res.status(200).json(ledger);
  } catch (error) {
    console.error("Error fetching ledger entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ────────────────────────────────
   🟠 Get Single Ledger by ID
──────────────────────────────── */

ledgerController.get("/getCustomerBalcBy/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isExit = await customerModel.findById(id);
    if (!isExit) {
      return res.status(400).json({ message: "Invalid Customer ID" });
    }
    const customers = await ledgerBookModel.aggregate([
      // 🧩 Step 1: Sirf is customer ka ledger lo
      {
        $match: {
          ledgerAccount: isExit.ledgerAccount,
          ledgerEntityId: new mongoose.Types.ObjectId(id),
          ledgerEntityType: "Customer",
        },
      },

      // 💰 Step 3: Total balance calculate karo
      {
        $group: {
          _id: "$ledgerEntityId",
          totalDebit: {
            $sum: {
              $cond: [{ $eq: ["$transectionType", "debit"] }, "$balanceAmount", 0],
            },
          },
          totalCredit: {
            $sum: {
              $cond: [{ $eq: ["$transectionType", "credit"] }, "$balanceAmount", 0],
            },
          },
        },
      },
      {
        $addFields: {
          totalBalance: { $subtract: ["$totalDebit", "$totalCredit"] },
        },
      },

      // 👤 Step 4: Customer details lookup
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customerInfo",
        },
      },

      // 🧾 Step 5: Ledger account details lookup
      {
        $lookup: {
          from: "accounts",
          localField: "customerInfo.ledgerAccount",
          foreignField: "_id",
          as: "customerledgerAcc",
        },
      },

      // 🧱 Step 6: Flatten customer info
      {
        $addFields: {
          customerName: { $arrayElemAt: ["$customerInfo.customerName", 0] },
          customerId: { $arrayElemAt: ["$customerInfo._id", 0] },
          ledgerAccount: { $arrayElemAt: ["$customerInfo.ledgerAccount", 0] },
        },
      },

      // ✅ Step 7: Flatten ledger account properly
      {
        $addFields: {
          customerledgerAcc: {
            $arrayElemAt: ["$customerledgerAcc", 0],
          },
        },
      },

      // 🧾 Step 8: Final projection
      {
        $project: {
          _id: 1,
          customerName: 1,
          customerId: 1,
          customerledgerAcc: {
            _id: 1,
            accountName: 1,
            accountNature: 1,
            accountType: 1,
          },
          totalBalance: 1,
        },
      },
    ]);

    res.status(200).json(customers[0] || {});
  } catch (error) {
    console.error("❌ Error fetching customer balance:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



/* ────────────────────────────────
   🟣 Update Ledger Entry
──────────────────────────────── */
ledgerController.put("/updateLedger/:id", async (req, res) => {
  try {
    const updatedLedger = await ledgerBookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLedger) {
      return res.status(404).json({ message: "Ledger entry not found" });
    }

    res.status(200).json({
      message: "Ledger entry updated successfully",
      ledger: updatedLedger,
    });
  } catch (error) {
    console.error("Error updating ledger entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ────────────────────────────────
   🔴 Delete Ledger Entry
──────────────────────────────── */
ledgerController.delete("/deleteLedger/:id", async (req, res) => {
  try {
    const deletedLedger = await ledgerBookModel.findByIdAndDelete(req.params.id);

    if (!deletedLedger) {
      return res.status(404).json({ message: "Ledger entry not found" });
    }

    res.status(200).json({ message: "Ledger entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting ledger entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default ledgerController;
