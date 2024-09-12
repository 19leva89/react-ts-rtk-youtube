import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";

// Get __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const connect = () => {
	mongoose
		.set('strictQuery', true)
		.connect(process.env.MONGO)
		.then(() => {
			console.log("Connected to DB");
		})
		.catch((err) => {
			console.error("Database connection error:", err);
		});
};

// Allowing Credentials for Cross-Domain Requests
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

// Using JSON parsing
app.use(express.json());

// Setting up CORS to work with cookies
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? "https://react-ts-rtk-youtube.onrender.com"
				: "http://localhost:3000",
		credentials: true,
	})
);

// Connecting cookie-parser
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// Setting up React static file serving
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Setting up static distribution of uploaded files from the upload folder
// https://your-domain/upload/file_name
app.use('/upload', express.static(path.join(__dirname, 'client', 'public', 'upload')));

// For all other routes, we send index.html from build
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

//Error handler
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || "Something went wrong!";
	return res.status(status).json({
		success: false,
		status: status,
		message: message,
	});
});

// Server port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	connect();
	console.log(`Server is running on port ${PORT}!`);
});