import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
//.......
export interface userInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  comfirmEmail: string;
  password: string;
  tokens: { token: string }[];
  getToken: () => Promise<string>;
}

interface userModel_interface extends Model<userInterface> {}

const userSchema = new Schema<userInterface>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    comfirmEmail: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (user.isModified("password")) {
      const hashedPassword = await bcrypt.hash(user.password, 8);
      user.password = hashedPassword;
      next();
    }
  } catch (error: any) {
    console.log(error.message);
  }
});

userSchema.methods.getToken = async function () {
  const user = this;
  try {
    const secret = process.env.JWT_SECRET;
    if (secret !== undefined) {
      const token = jwt.sign({ _id: user._id }, secret);
      user.tokens = user.tokens.concat({ token: token });
      await user.save();
      return token;
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

userSchema.methods.toJSON = function () {
  const user = this;
  const DocumentObj = user.toObject();

  delete DocumentObj.tokens;
  delete DocumentObj.password;

  return DocumentObj;
};

export const userModel = mongoose.model<userInterface>(
  "user",
  userSchema,
  "user"
) as userModel_interface;
