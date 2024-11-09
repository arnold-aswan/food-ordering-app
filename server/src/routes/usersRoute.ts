import express from "express";
import userController from "../controllers/userController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// /api/user
router.post("/", jwtCheck, userController.createUser);

export default router;
