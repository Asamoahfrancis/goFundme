import mongoose, { Document, Model, Schema, mongo } from "mongoose";

interface contactType extends Document {
  contact: string;
  owner: any;
}

interface contactModel_interface extends Model<contactType> {}

const contactSchema = new Schema<contactType>({
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

contactSchema.post("save", function (doc, next) {
  console.log("after saved", doc);

  next();
});

export const contactModel = mongoose.model<contactType>(
  "contact",
  contactSchema,
  "contact"
) as contactModel_interface;
