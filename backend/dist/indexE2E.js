import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT, STATE } from "./config/serverConfig.js";
import cors from "cors";
import { generateRoomId, pub, sub } from "./redis.js";
import bodyParser from "body-parser";
let siteUrl = STATE === "development"
    ? "http://localhost:3001"
    : "https://ephemera-rho.vercel.app";
const corsOptions = {
    origin: siteUrl,
    methods: ["GET", "POST"],
};
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/api/savePublicKey", async (req, res) => {
    const { userId, publicKeyJwk } = req.body;
    if (!userId || !publicKeyJwk) {
        return res.status(400).send("Invalid request");
    }
    else {
        await pub.hset(`${userId}`, "publicKeyJwk", JSON.stringify(publicKeyJwk), (err, reply) => {
            if (err) {
                console.error("Error saving public key:", err);
                return res.status(500).send("Error saving public key");
            }
            return res.status(200).send("Public key saved successfully");
        });
    }
});
app.get("/api/getPublicKey", async (req, res) => {
    const userId = req.query.userId;
    console.log("Received request for userId:", userId);
    if (!userId) {
        return res.status(400).json({ error: "Invalid request" });
    }
    try {
        const publicKeyJwkString = await pub.hget(`${userId}`, "publicKeyJwk");
        if (!publicKeyJwkString) {
            console.log("hello");
            return res.status(404).json({ error: "Public key not found" });
        }
        const publicKeyJwk = JSON.parse(publicKeyJwkString);
        console.log("publicKeyJwk", publicKeyJwk);
        return res.status(200).json({ publicKeyJwk });
    }
    catch (error) {
        console.error("Error fetching public key:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
const server = createServer(app);
const io = new Server(server, {
    cors: corsOptions,
});
sub.subscribe("MESSAGES", (err, count) => {
    if (err) {
        console.error("Failed to subscribe: %s", err.message);
    }
    else {
        console.log(`Subscribed successfully! This client is currently subscribed to ${count} channel(s).`);
    }
});
sub.on("message", (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`);
});
io.on("connection", (socket) => {
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
        let roomExists = await pub.sismember("rooms", roomId);
        if (roomExists) {
            socket.join(roomId);
        }
        else {
            socket.emit("error", "Invalid Room Id");
        }
        socket.on("message", async (message) => {
            await pub.publish("MESSAGES", JSON.stringify({ message }));
            io.to(roomId).emit("message", message);
        });
    });
    socket.on("register", async () => {
        let userId;
        let userExists = true;
        do {
            userId = generateRoomId();
            try {
                let userExistsResult = await pub.sismember(userId, socket.id);
                userExists = userExistsResult === 1;
            }
            catch (err) {
                console.error(`Error checking user existence`);
                userExists = true;
            }
        } while (userExists);
        await pub.hset(userId, "socketId", socket.id);
        socket.emit("getUserId", userId);
        socket.on("disconnect", async () => {
            await pub.hdel(userId, "socketId");
            await pub.hdel(userId, "publicKeyJwk");
        });
    });
    socket.on("message1v1", async ({ recipientId, message }) => {
        console.log(recipientId, message);
        const recipientSocketId = await pub.hget(recipientId, "socketId");
        console.log(recipientSocketId);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("messageRecipient", {
                encryptedMessage: message,
                senderId: recipientId,
            });
        }
        else {
            socket.emit("error", "Invalid Room Id");
        }
    });
    socket.on("disconnect", async () => {
        const rooms = await pub.smembers("rooms");
        rooms.forEach(async (roomId) => {
            if (socket.rooms.has(roomId)) {
                await pub.srem("rooms", roomId);
            }
        });
    });
});
server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
//# sourceMappingURL=indexE2E.js.map