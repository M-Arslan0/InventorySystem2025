import express from "express";
import mongoose from "mongoose";
import userModel from "../model/userModel.js";
import permissionModel from "../model/permissionModel.js";

const userController = express.Router();


userController.post("/createUser", async (req, res) => {
  const session = await mongoose.startSession(); // 🧠 start session
  session.startTransaction(); // ⚙️ start transaction

  try {
    const { name, department, userName, userPassword, modules } = req.body;

    // 🧩 Step 1: Validate input
    if (!name || !userName || !userPassword) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // 🧩 Step 2: Create User
    const newUser = await userModel.create(
      [{ name, department, userName, userPassword }],
      { session }
    );

    // 🧩 Step 3: Create Permission
    await permissionModel.create(
      [
        {
          userId: newUser[0]._id,
          modules: modules || {},
        },
      ],
      { session }
    );

    // ✅ Step 4: Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully with permissions",
      userId: newUser[0]._id,
    });

  } catch (error) {
    // ❌ Step 5: Rollback on error
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating user with transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// Get all users
userController.get("/getAllUsers", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get single user by ID
userController.get("/getUser/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user
userController.put("/updateUser/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete user
userController.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default userController;
