import express from "express";
import areaModel from "../model/areaModel.js";
import cityModel from "../model/cityModel.js";
import cusVenTypeModal from "../model/cusVenTypeModal.js";

const miscController = express.Router();

/* ----------------------------- AREA ROUTES ----------------------------- */
miscController.post("/createArea", async (req, res) => {
  try {
    const {areaCode} = req.body
    const isExit = await areaModel.findOne({areaCode})
    if(isExit) return res.status(409).json({ message: "Area with this code is already exits" });
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
    const {cityCode} = req.body
    const isExit = await cityModel.findOne({cityCode})
    if(isExit) return res.status(409).json({ message: "City with this code is already exits" });
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
     const {typeCode} = req.body
    const isExit = await cusVenTypeModal.findOne({typeCode})
    if(isExit) return res.status(409).json({ message: "Type with this code is already exits" });
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

export default miscController;
