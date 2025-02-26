import express from "express";
import { uploadVideo, getVideos, deleteVideo } from "../controllers/video.js";

const router = express.Router();

// Video yükleme
router.post("/upload", uploadVideo);

// Video listeleme
router.get("/list", getVideos);

// Video silme
router.delete("/delete/:id", deleteVideo);

export default router;
