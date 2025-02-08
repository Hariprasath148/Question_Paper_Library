import express from "express";
import { delete_questionPaper, get_questionPaper, savePDF} from "../controllers/questionpaper.controller.js";
import upload  from "../middleware/uploadPDF.js";
import { add_subject, get_subject } from '../controllers/questionpaper.controller.js'; 
const router = express.Router();


router.post("/save-question-paper",upload.array("file"),savePDF);
router.post("/add-subject",add_subject)
router.get("/get-subject",get_subject)
router.get("/get-questionPaper",get_questionPaper)
router.delete("/delete-questionPaper",delete_questionPaper)
export default router;
