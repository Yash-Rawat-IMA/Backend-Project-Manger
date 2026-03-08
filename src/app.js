import express from "express";
import cors from "cors";

const app = express();

//Basic configurations
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded( {extended: true, limit: "16kb"} ));
app.use(express.static("public"))

// CORS Configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// Import Routes
import healthCheckRouter from "./routes/healthCheck.routes.js";
import authRouter from "./routes/auth.routes.js";

// Making APIs
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);

// Base APIs
app.get("/", (req, res) => {
    res.send("Welcome to base")
})

app.get("/test", (req, res) => {
    res.send("Testing is going on!")
})

// GLOBAL ERROR HANDLER (always last)
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        errors: err.errors || []
    });
});

export default app;