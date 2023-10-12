//API creating database

import databaseLink from "../../utilities/database";
import Mongoose from "mongoose";
import userM from "../../models/userM";
import bcrypt from "bcrypt";

export default async function addUser(req, res) {
  const user = req.body;
  await databaseLink();
  const checkUser = await userM.findOne({ email: user.email });

  if (!checkUser) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    const newUser = {email: user.email, password: password, role: user.role};
    const result = await new userM(newUser).save();

    res.json(result);
  } else {
    const result = {status:"error", message:"Exists already"};
    res.json(result);
  }

}