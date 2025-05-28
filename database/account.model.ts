import { model, models, Schema } from "mongoose";

const AccountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  image: { type: String },
  password: { type: String },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
});
