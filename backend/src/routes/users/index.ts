import express from "express";
import { getAllUsers } from "../../controllers/users";
import { authenticateToken } from "../../middleware/auth";

const router = express.Router();

router.get("/getAllUsers", authenticateToken, getAllUsers);

export default router;
