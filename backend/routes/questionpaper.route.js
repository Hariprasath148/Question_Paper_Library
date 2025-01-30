import express from "express";
import { savePDF } from "../controllers/questionpaper.controller.js";
import upload  from "../middleware/uploadPDF.js";

const router = express.Router();


router.post("/save-question-paper",upload.single("file"),savePDF);

export default router;
