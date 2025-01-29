import { io } from "socket.io-client";
const socket = io("http://localhost:3001", {
  auth: {
    token: "seu_token_aqui",
  },
});
export default socket;
