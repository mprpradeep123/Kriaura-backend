import express from "express";
import cors from "cors";
import "dotenv/config";
import orderRouter from "./routes/orderRoutes.js";
import connectDB from "./config/connectDB.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/order", orderRouter);

app.listen(process.env.PORT, async() => {
  try {
    await connectDB();
    console.log(
      `Server running on http://localhost:${process.env.PORT} successfully !!!`
    );
  } catch (error) {
    console.log(`Server Connection Error`, error.message);
  }
});