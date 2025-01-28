import express from "express";
import { body } from "express-validator";
import { login, register } from "../../controllers/auth";

const router = express.Router();

router.post(
  "/register",
  [body("username").isString(), body("password").isLength({ min: 6 })],
  register
);

router.post(
  "/login",
  [body("username").isString(), body("password").exists()],
  login
);

export default router;
