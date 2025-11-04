const expressApp = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenvIndex = require("dotenv");
dotenvIndex.config();
const heroRoutes = require("./routes/heroRoutes");

const app = expressApp();
app.use(cors());
app.use(expressApp.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connecté"))
	.catch((err: any) => console.error(err));

app.use("/api/heroes", heroRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
