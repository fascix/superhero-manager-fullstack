const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const heroRoutes = require("./routes/heroRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connecté"))
	.catch((err: any) => console.error(err));

app.get("/", (_req: any, res: { send: (arg0: string) => void }) => {
	res.send("Serveur backend OK !");
});

app.use("/api/heroes", heroRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
