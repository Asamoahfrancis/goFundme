import { Request, Response, NextFunction } from "express";
import { userModel } from "../Models/userModel";
import jwt from "jsonwebtoken";
export interface UserRequest extends Request {
  user?: any;
  token?: any;
}

const authMiddleWare = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "").trim();
    if (!token) {
      throw new Error("Please Authenticate");
    }
    const JWT_SECRE = process.env.JWT_SECRET as string;
    const decoded: any = jwt.verify(token, JWT_SECRE);
    const getUser = await userModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!getUser) {
      throw new Error("Please Authenticate");
    }
    req.user = getUser;
    req.token = token;
    next();
  } catch (error: any) {
    res.status(400).send({ Error: error.message });
  }
};

export default authMiddleWare;
