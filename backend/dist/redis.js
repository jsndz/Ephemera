import { serviceUri } from "./config/serverConfig.js";
import { Redis } from "ioredis";
export const pub = new Redis(serviceUri);
export const sub = new Redis(serviceUri);
export function generateRoomId(length = 5) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roomId = "";
    for (let i = 0; i < length; i++) {
        roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomId;
}
//# sourceMappingURL=redis.js.map