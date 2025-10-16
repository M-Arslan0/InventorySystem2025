import express from "express";
import areaModel from "../model/areaModel.js";
import cityModel from "../model/cityModel.js";
import cusVenTypeModal from "../model/cusVenTypeModal.js";
import brandModel from "../model/brandModel.js";
import categoryModel from "../model/categoryModel.js";
import uomModel from "../model/uomModel.js";
import packingSizeModel from "../model/packingSizeModel.js";

const miscController = express.Router();

/* ----------------------------- AREA ROUTES ----------------------------- */
miscController.post("/createArea", async (req, res) => {
  try {
    const { areaCode } = req.body
    const isExit = await areaModel.findOne({ areaCode })
    if (isExit) return res.status(409).json({ message: "Area with this code is already exits" });
    const newArea = await areaModel.create(req.body);
    if (!newArea) {
      return res.status(400).json({ message: "Failed to create area" });
    }
    res.status(201).json({ message: "Area created successfully", data: newArea });
  } catch (error) {
    console.error("Error creating area:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

miscController.get("/getAllArea", async (req, res) => {
  try {
    const areas = await areaModel.find().sort({ createdAt: -1 });
    res.status(200).json(areas);
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ----------------------------- CITY ROUTES ----------------------------- */
miscController.post("/createCity", async (req, res) => {
  try {
    const { cityCode } = req.body
    const isExit = await cityModel.findOne({ cityCode })
    if (isExit) return res.status(409).json({ message: "City with this code is already exits" });
    const newCity = await cityModel.create(req.body);
    if (!newCity) {
      return res.status(400).json({ message: "Failed to create city" });
    }
    res.status(201).json({ message: "City created successfully", data: newCity });
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

miscController.get("/getAllCity", async (req, res) => {
  try {
    const cities = await cityModel.find().sort({ createdAt: -1 });
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ----------------------- CUSTOMER / VENDOR TYPE ROUTES ----------------------- */
miscController.post("/createCusVenType", async (req, res) => {
  try {
    const { typeCode } = req.body
    const isExit = await cusVenTypeModal.findOne({ typeCode })
    if (isExit) return res.status(409).json({ message: "Type with this code is already exits" });
    const newType = await cusVenTypeModal.create(req.body);
    if (!newType) {
      return res.status(400).json({ message: "Failed to create customer/vendor type" });
    }
    res.status(201).json({ message: "Customer/Vendor type created successfully", data: newType });
  } catch (error) {
    console.error("Error creating customer/vendor type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

miscController.get("/getAllCusVenType", async (req, res) => {
  try {
    const types = await cusVenTypeModal.find().sort({ createdAt: -1 });
    res.status(200).json(types);
  } catch (error) {
    console.error("Error fetching customer/vendor types:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* -----------------------Brand ----------------------- */
miscController.post("/createBrand", async (req, res) => {
  try {
    const { brandCode } = req.body
    const isExit = await brandModel.findOne({ brandCode })
    if (isExit) return res.status(409).json({ message: "Brand with this code is already exits" });
    const newBrand = await brandModel.create(req.body);
    if (!newBrand) {
      return res.status(400).json({ message: "Failed to create brand" });
    }
    res.status(201).json({ message: "Brand created successfully" });
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

miscController.get("/getAllBrand", async (req, res) => {
  try {
    const brands = await brandModel.find().sort({ createdAt: -1 });
    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* -----------------------Category ----------------------- */
miscController.post("/createCategory", async (req, res) => {
  try {
    const { categoryCode } = req.body;
    const isExist = await categoryModel.findOne({ categoryCode });
    if (isExist)
      return res.status(409).json({ message: "Category with this code already exists" });

    const newCategory = await categoryModel.create(req.body);
    if (!newCategory) {
      return res.status(400).json({ message: "Failed to create category" });
    }
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


miscController.get("/getAllCategory", async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ----------------------- UOM ----------------------- */

// ✅ Create UOM
miscController.post("/createUOM", async (req, res) => {
  try {
    const { uomCode } = req.body;
    const isExist = await uomModel.findOne({ uomCode });
    if (isExist)
      return res.status(409).json({ message: "UOM with this code already exists" });

    const newUOM = await uomModel.create(req.body);
    if (!newUOM) {
      return res.status(400).json({ message: "Failed to create UOM" });
    }

    res.status(201).json({ message: "UOM created successfully" });
  } catch (error) {
    console.error("Error creating UOM:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get All UOM
miscController.get("/getAllUOM", async (req, res) => {
  try {
    const uoms = await uomModel.find().sort({ createdAt: -1 });
    res.status(200).json(uoms);
  } catch (error) {
    console.error("Error fetching UOMs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


/* ----------------------- Packing Size ----------------------- */

// ✅ Create Packing Size
miscController.post("/createPackingSize", async (req, res) => {
  try {
    const { packingCode } = req.body;
    const isExist = await packingSizeModel.findOne({ packingCode });
    if (isExist)
      return res.status(409).json({ message: "Packing Size with this code already exists" });

    const newPacking = await packingSizeModel.create(req.body);
    if (!newPacking) {
      return res.status(400).json({ message: "Failed to create packing size" });
    }

    res.status(201).json({ message: "Packing Size created successfully" });
  } catch (error) {
    console.error("Error creating Packing Size:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get All Packing Sizes
miscController.get("/getAllPackingSize", async (req, res) => {
  try {
    const packings = await packingSizeModel.find().sort({ createdAt: -1 });
    res.status(200).json(packings);
  } catch (error) {
    console.error("Error fetching Packing Sizes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default miscController;
