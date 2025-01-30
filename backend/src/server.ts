import cors from "cors";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { corsOptions } from "./config/cors";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import { IVote } from "./types";
import { getUserFromToken } from "./utils/auth";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", usersRoutes);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const user = getUserFromToken(token);

  if (!user) {
    return next(new Error("Unauthorized"));
  }

  if (!token) {
    return next(new Error("Authentication error"));
  }

  socket.data.user = user; // Adiciona o usuário ao socket

  next();
});

let votes: IVote = {};

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.data?.user?.username}`);

  socket.on("vote", (voteValue: string) => {
    const user = getUserFromToken(socket.handshake.auth.token);

    if (!user) {
      return;
    }

    const updatedVotes = {
      ...votes,
      [socket.id]: { username: user.username, vote: voteValue }, // Guarda nome e voto
    };

    votes = updatedVotes; // Atualiza os votos

    io.emit("updateVotes", updatedVotes); // Envia os votos atualizados para todos
  });

  socket.on("disconnect", () => {
    delete votes[socket.id]; // Deleta o voto do usuário desconectado

    io.emit("updateVotes", { ...votes }); // Envia os votos atualizado

    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
