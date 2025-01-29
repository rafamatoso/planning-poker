import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  auth: {
    token: localStorage.getItem("planning-poker-token"),
  },
});

export default socket;
