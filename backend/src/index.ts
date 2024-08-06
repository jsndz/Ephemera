import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT, STATE } from "./config/serverConfig.js";
import cors from "cors";
import { initializeSocket } from "./socket.js";
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
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
initializeSocket(io);
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
