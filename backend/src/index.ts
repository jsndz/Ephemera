import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PORT } from "./config/serverConfig.js";
import cors from "cors";
const corsOption = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST"],
};

const app = express();
app.use(cors(corsOption));
const server = createServer(app);
const io = new Server(server);

server.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
  io.on("connection", (socket) => {
    console.log("a user connected");
  });
});
