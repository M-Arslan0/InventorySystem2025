import express from "express";
import companyModel from "../model/companyModel.js";

const companyController = express.Router();

// 🔹 Create Company (agar already ek company hai to update karega)
companyController.post("/createOrUpdateCompany", async (req, res) => {
  try {
    const existing = await companyModel.findOne();
    if (existing) {
      const updated = await companyModel.findByIdAndUpdate(existing._id, req.body, {
        new: true,
        runValidators: true,
      });
      return res
        .status(200)
        .json({ message: "Company updated successfully", company: updated });
    }

    const newCompany = await companyModel.create(req.body);
    if (!newCompany) {
      return res.status(400).json({ message: "Failed to create company" });
    }

    res
      .status(201)
      .json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    console.error("Error creating/updating company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Get all Companies (mostly ek hi company hogi)
companyController.get("/getAllCompanies", async (req, res) => {
  try {
    const companies = await companyModel.find();
    res.status(200).json({ companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Get single company (agar ek hi company store hai)
companyController.get("/getCompany", async (req, res) => {
  try {
    const company = await companyModel.findOne();
    if (!company) {
      return res.status(200).json({ exists: false, message: "No company found" });
    }
    res.status(200).json({ exists: true, company });
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Get single company by ID
companyController.get("/getCompanyById/:id", async (req, res) => {
  try {
    const company = await companyModel.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ company });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Update company by ID
companyController.put("/updateCompany/:id", async (req, res) => {
  try {
    const updatedCompany = await companyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res
      .status(200)
      .json({ message: "Company updated successfully", company: updatedCompany });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Delete company
companyController.delete("/deleteCompany/:id", async (req, res) => {
  try {
    const deletedCompany = await companyModel.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default companyController;
