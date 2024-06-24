import mongoose, { Mongoose, Schema } from "mongoose";

mongoose.pluralize(null);

const collection = "user_index";

const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true, index: true },
  email: { type: Number, required: true },
  password: { type: Number, required: true },
  role: { type: String, enum: ["admin", "premium", "user"], default: "user" },
});

const model = mongoose.model(collection, schema);

export default model;
