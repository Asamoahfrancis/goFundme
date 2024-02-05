import express from "express";
import cors from "cors";
import { contactModel } from "../Models/contactModel";
import authMiddleWare, { UserRequest } from "../Middleware/authMiddlerware";
//......
export const ContactRoute = express.Router();
ContactRoute.use(express.json());
ContactRoute.use(cors());

//.....

ContactRoute.post(
  "/contact/me",
  authMiddleWare,
  async (req: UserRequest, res) => {
    try {
      const payload = {
        ...req.body,
        owner: req.user._id,
      };
      const newContact = new contactModel(payload);
      if (!newContact) {
        return res.status(400).send({ Error: "error to get new contact" });
      }
      await newContact.save();
      res.status(201).send(newContact);
    } catch (error: any) {
      res.status(400).send({ Error: error.message });
    }
  }
);
