import dotenv from "dotenv";
dotenv.config();
export const PORT = parseInt(process.env.PORT || "3000", 10);
export const STATE = process.env.STATE || "development";
export const serviceUri = process.env.SERVICEURI || "development";
//# sourceMappingURL=serverConfig.js.map