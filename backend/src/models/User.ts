import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	role: { type: String, enum: ["admin", "editor"], default: "editor" },
	createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
