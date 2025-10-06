import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

mongoose.connect("mongodb://localhost:27017", {
  dbName: "InventorySystem",
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DataBase Connection Error"));
db.once("open", () => console.log("DataBase Has Connected"));

export default db;

