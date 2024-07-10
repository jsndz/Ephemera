import { Redis } from "ioredis";
import { serviceUri } from "../config/serverConfig.js";

export const pub = new Redis(serviceUri);
pub
  .flushall()
  .then(() => {
    console.log("Redis data flushed successfully");
    pub.quit();
  })
  .catch((err: any) => {
    console.error("Error flushing Redis: ", err);
    pub.quit();
  });
