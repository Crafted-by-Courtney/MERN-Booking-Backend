import databaseLink from "utilities/database";
import userM from "models/userM";
import { getSession } from "next-auth/react";

export default async function getUser(req, res) {
  await databaseLink();
  const session = await getSession({ req });

  try {
    const result = await userM.findById(session.user.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ status: "error", message: "test" });
  }
}