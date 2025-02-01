import express from "express";
import { savePDF} from "../controllers/questionpaper.controller.js";
import upload  from "../middleware/uploadPDF.js";
import { add_subject, get_subject } from '../controllers/questionpaper.controller.js'; 
const router = express.Router();


router.post("/save-question-paper",upload.single("file"),savePDF);
router.post("/add-subject",add_subject)
router.get("/get-subject",get_subject)
export default router;
