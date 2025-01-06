import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import usersRoute from "./routes/usersRoute";
import myRestaurantRoute from "./routes/myRestaurantRoute";
import restaurantRoute from "./routes/restaurantRoute";
import orderRoute from "./routes/orderRoute";
import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error("Error connecting to DB:", error));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" })); // Raw parser for Paystack);

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

app.use("/api/user", usersRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

const port = 7000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
