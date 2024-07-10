import { Redis } from "ioredis";
import { serviceUri } from "../config/serverConfig.js";
export const pub = new Redis(serviceUri);
pub
    .flushall()
    .then(() => {
    console.log("Redis data flushed successfully");
    pub.quit();
})
    .catch((err) => {
    console.error("Error flushing Redis: ", err);
    pub.quit();
});
//# sourceMappingURL=flush.js.map