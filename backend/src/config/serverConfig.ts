import dotenv from "dotenv";
dotenv.config();
export const PORT: number = parseInt(process.env.PORT || "3000", 10);
export const STATE: string = process.env.STATE || "development";
export const serviceUri: string = process.env.SERVICEURI || "development";
