import houseM from "models/houseM";
import databaseLink from "utilities/database";

export default async function getAll(req, res) {
  await databaseLink();
  try {
    const result = await houseM.find();
    res.json(result);
  } catch (error) {
    res.status(400).json({ status: "error", message: "test" });
  }
}