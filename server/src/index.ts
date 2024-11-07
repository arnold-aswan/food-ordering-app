import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const connection = mongoose.createConnection(process.env.MONGODB_URI as string);

connection.on("connected", () => {
	console.log("connected to DB");
});

connection.on("error", (error) => {
	console.error("Error connecting to DB:", error);
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
	res.json({ message: "Hello" });
});

const port = 7000;
app.listen(port, () => {
	console.log(`server started on port ${port}`);
});
