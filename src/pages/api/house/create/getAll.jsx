import houseM from "models/houseM";
import databaseLink from "utilities/database";

export default async function getAll(req, res) {
  try {
    // Establish the database connection by calling the function
    await databaseLink();

    const result = await houseM.find();
    res.json(result);
  } catch (error) {
    console.error("Database connection or query error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}
