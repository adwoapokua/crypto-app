import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express"
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(express.json());
    app.use("/api/auth", authRoutes);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

startServer();