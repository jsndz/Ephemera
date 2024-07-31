import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT, STATE } from "./config/serverConfig.js";
import cors from "cors";
import { generateRoomId, pub, sub } from "./redis.js";

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
sub.subscribe("MESSAGES", (err, count) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  } else {
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channel(s).`
    );
  }
});

sub.on("message", (channel, message) => {
  console.log(`Received message from ${channel}: ${message}`);
});
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("createRoom", async () => {
    let roomId;
    let roomExists = true;
    do {
      roomId = generateRoomId();
      let roomExistsResult = await pub.sismember("rooms", roomId);
      roomExists = roomExistsResult === 1;
    } while (roomExists);
    await pub.sadd("rooms", roomId);
    socket.join(roomId);
    socket.emit("getRoomId", roomId);
  });

  socket.on("joinRoom", async (roomId) => {
    console.log(`Joining room ${roomId}`);
    let roomExists = await pub.sismember("rooms", roomId);
    if (roomExists) {
      socket.join(roomId);
    } else {
      socket.emit("error", "Invalid Room Id");
    }
    socket.on("message", async (message) => {
      console.log(message);

      await pub.publish("MESSAGES", JSON.stringify({ message }));

      io.to(roomId).emit("message", message);
    });
  });
  socket.on("register", async () => {
    let userId: string;

    let userExists = true;
    do {
      userId = generateRoomId();
      try {
        let userExistsResult = await pub.sismember(userId, socket.id);
        userExists = userExistsResult === 1;
      } catch (err) {
        console.error(`Error checking user existence`);
        userExists = true;
      }
    } while (userExists);
    await pub.sadd(`${userId}`, socket.id);
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
    socket.emit("getUserId", userId);
    socket.on("disconnect", async () => {
      await pub.srem(`${userId}`, socket.id);
    });
  });
  socket.on("registerP2P", async () => {
    let userId: string;

    let userExists = true;
    do {
      userId = generateRoomId();
      try {
        let userExistsResult = await pub.sismember(userId, socket.id);
        userExists = userExistsResult === 1;
      } catch (err) {
        console.error(`Error checking user existence`);
        userExists = true;
      }
    } while (userExists);
    await pub.sadd(`${userId}`, socket.id);
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
    socket.emit("getUserIdP2P", userId);
    socket.on("disconnect", async () => {
      await pub.srem(`${userId}`, socket.id);
    });
  });
  socket.on("message1v1", async ({ recipientId, message }) => {
    console.log(`Message from ${socket.id} to ${recipientId}: ${message}`);
    const recipientSocketId = await pub.smembers(recipientId);
    console.log(recipientSocketId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("messageRecipient", message);
    } else {
      console.log(`User ${recipientId} is not connected`);
      socket.emit("error", "Invalid Room Id");
    }
  });
  socket.on("disconnect", async () => {
    console.log("User disconnected");
    const rooms = await pub.smembers("rooms");
    rooms.forEach(async (roomId) => {
      if (socket.rooms.has(roomId)) {
        await pub.srem("rooms", roomId);
        console.log(`deleted ${roomId}`);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
