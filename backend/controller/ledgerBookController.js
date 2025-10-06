import express from "express";
import ledgerBookModel from "../model/ledgerBookModel.js";

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
ledgerController.get("/getLedger/:id", async (req, res) => {
  try {
    const {id} = req.params
    const ledger = await ledgerBookModel
      .find({ledgerEntityId:id})
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
