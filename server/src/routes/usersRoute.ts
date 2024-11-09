import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// /api/user
router.post("/", userController.createUser);

export default router;
