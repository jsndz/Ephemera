import dotenv from "dotenv";
dotenv.config();
export const PORT: number = parseInt(process.env.PORT || "3000", 10);
