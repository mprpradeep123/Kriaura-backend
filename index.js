import express from "express";
import cors from "cors";
import "dotenv/config";
import orderRouter from "./routes/orderRoutes.js";
import connectDB from "./config/connectDB.js";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://kriyaurawellness.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// 👇 ensure Express properly replies to preflight OPTIONS
app.options("*", cors());

app.use("/api/v1/order", orderRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(
      `✅ Server running on http://localhost:${process.env.PORT}`
    );
  } catch (error) {
    console.log(`❌ Server Connection Error`, error.message);
  }
});
