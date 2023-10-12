import userM from "models/userM";
import databaseLink from "utilities/database";

export default async function getUser(req, res) {
  try {
    // Establish the database connection by calling the function
    await databaseLink();
    
    const session = await getSession({ req });
    const result = await userM.findById(session.user.id);
    res.json(result);
  } catch (error) {
    console.error("Database connection or query error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}
