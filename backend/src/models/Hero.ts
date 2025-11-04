const { model, Schema } = require("mongoose");

const heroSchema = new Schema({
	nom: { type: String, required: false },
	alias: String,
	univers: String,
	pouvoirs: [String],
	description: String,
	image: String,
	origine: String,
	premiereApparition: String,
});
module.exports = model("User", heroSchema);
