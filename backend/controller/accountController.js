import express from "express";
import accountChartModel from "../model/accountChartModel.js";

const accountController = express.Router();

// Create a new account
accountController.post("/createAccount", async (req, res) => {
  try {
    const newAccount = await accountChartModel.create(req.body);
    if (!newAccount) {
      return res.status(400).json({ message: "Failed to create account" });
    }
    res.status(201).json({ message: "Account created successfully", account: newAccount });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all accounts
accountController.get("/getAllAccounts", async (req, res) => {
  try {
    const accounts = await accountChartModel.find();
    res.status(200).json({ accounts });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get single account by ID
accountController.get("/getAccount/:id", async (req, res) => {
  try {
    const account = await accountChartModel.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json({ account });
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update account
accountController.put("/updateAccount/:id", async (req, res) => {
  try {
    const updatedAccount = await accountChartModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json({ message: "Account updated successfully", account: updatedAccount });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete account
accountController.delete("/deleteAccount/:id", async (req, res) => {
  try {
    const deletedAccount = await accountChartModel.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default accountController;
