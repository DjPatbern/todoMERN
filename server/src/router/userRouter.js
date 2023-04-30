import express from "express";
import { UserModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User Already Exist" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashPassword });
  await newUser.save();

  res.json({ message: "User Registered Successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User Does Not Exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret")

  return res.json({ token, UserId: user._id, });
});
export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
