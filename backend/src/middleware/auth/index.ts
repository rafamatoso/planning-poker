import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/dotenv";
import { getUserFromToken } from "../../utils/auth";
import { AuthRequest } from "./interfaces";

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    if (!token) {
      res.status(401).json({ message: "Access denied" });
    } else {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(" ")[1]; // "Bearer token"

  const user = getUserFromToken(token || "");

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user; // Armazena os dados do usuário na request

  next();
};
