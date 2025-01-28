import cors from "cors";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { corsOptions } from "./config/cors";
import { VoteData } from "./types";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors());

io.on("connection", (socket: Socket) => {
  console.log("User connected:", socket.id);

  socket.on("vote", (data: VoteData) => {
    io.emit("updateVotes", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
