import express from "express";
import cors from "cors";
import "dotenv/config";
import orderRouter from "./routes/orderRoutes.js";
import connectDB from "./config/connectDB.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://kriyaurawellness.in",
    credentials: true,
  })
);

app.use("/api/v1/order", orderRouter);

app.listen(process.env.PORT, async() => {
  try {
    await connectDB();
    console.log(
      `Server running on https://kriyaurawellness.in:${process.env.PORT} successfully !!!`
    );
  } catch (error) {
    console.log(`Server Connection Error`, error.message);
  }
});

