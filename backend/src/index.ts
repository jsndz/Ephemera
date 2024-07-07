import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT, STATE } from "./config/serverConfig.js";
import cors from "cors";

let siteUrl =
  STATE === "development"
    ? "http://localhost:3001"
    : "https://ephemera-rho.vercel.app";

const corsOptions = {
  origin: siteUrl,
  methods: ["GET", "POST"],
};

const app = express();
app.use(cors(corsOptions));

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (roomId) => {
    console.log(`Joining room ${roomId}`);
    socket.join(roomId);

    socket.on("message", (message) => {
      console.log(message);
      io.to(roomId).emit("message", message);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT || 3000, () => {
  console.log(`Server is running at port ${PORT}`);
});
