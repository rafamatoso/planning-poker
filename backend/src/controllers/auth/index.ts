import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { JWT_SECRET, TOKEN_EXPIRATION } from "../../config/dotenv";
import { users } from "../../db";
import { User } from "../../types";

// Registro de usuário
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Verifica se já existe um usuário com esse nome
  if (users.some((user) => user.username === username)) {
    res.status(400).json({ message: "Username already exists" });
    return;
  }

  // Criptografa a senha antes de salvar
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { id: uuidv4(), username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

// Login de usuário
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid credentials" });

    return;
  }

  // Gera token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });

  res.json({ token });
};
