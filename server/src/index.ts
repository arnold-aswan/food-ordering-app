import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import usersRoute from "./routes/usersRoute";

mongoose
	.connect(process.env.MONGODB_URI as string)
	.then(() => console.log("Connected to DB"))
	.catch((error) => console.error("Error connecting to DB:", error));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", usersRoute);

const port = 7000;
app.listen(port, () => {
	console.log(`server started on port ${port}`);
});
