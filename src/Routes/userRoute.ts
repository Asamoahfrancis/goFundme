import express from "express";
import cors from "cors";
import { userModel } from "../Models/userModel";
import authMiddleWare from "../Middleware/authMiddlerware";
import { UserRequest } from "../Middleware/authMiddlerware";
//......
export const UserRoute = express.Router();
UserRoute.use(express.json());
UserRoute.use(cors());
//.....

UserRoute.post("/user", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const token = await newUser.getToken();
    const results = await newUser.save();
    res.status(201).send({ user: results, token: token });
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});

UserRoute.get("/user/me", authMiddleWare, async (req: UserRequest, res) => {
  try {
    const user = req.user;
    res.status(200).send({ user: user });
  } catch (error: any) {
    res.status(400).send({ Error: error.message });
  }
});
