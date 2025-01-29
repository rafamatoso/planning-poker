import { Request, Response } from "express";
import { users } from "../../db";

// Retorna todos os usuários
export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({ message: "Get all users successfully", users });
};
