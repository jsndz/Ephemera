import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PORT, STATE } from "./config/serverConfig.js";
import cors from "cors";
let siteUrl: string;
STATE === "development" ? (siteUrl = "http://localhost:3001") : (siteUrl = "");
const corsOption = {
  origin: siteUrl,
  methods: ["GET", "POST"],
};

const app = express();
app.use(cors(corsOption));
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: siteUrl,
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});
server.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
