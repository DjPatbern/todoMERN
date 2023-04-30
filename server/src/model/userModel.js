import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // tasks: [
  //   {
  //     taskName: { type: String },
  //     dateAdded: { type: String },
  //     deadline: { type: String },
  //     completed: { type: Boolean },
  //     userOwner: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "users",
  //       required: true,
  //     },
  //   },
  // ],
});

export const UserModel = mongoose.model("users", UserSchema);
