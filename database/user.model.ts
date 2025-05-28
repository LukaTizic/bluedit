import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String, required: true },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  //   When user was created
  { timestamps: true }
);

const User = models?.user || model("User", UserSchema);

export default User;
