import databaseLink from "/utilities/database";
import houseM from "/models/houseM";
import { getSession } from "next-auth/react";

export default async function addHouse(req, res) {
  try {
    // Establish the database connection by calling the function
    await databaseLink();

    const session = await getSession({ req });

    const body = req.body;
    console.log(body);

    const result = await new houseM({
      price: body?.price,
      description: body?.description,
      address: body?.address,
      country: body?.country,
    }).save();

    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}
