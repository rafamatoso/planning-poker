import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/dotenv";

export const getUserFromToken = (token: string) => {
  try {
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
    };

    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);

    return null;
  }
};
