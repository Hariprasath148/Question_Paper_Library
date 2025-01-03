import express from "express";
import { store } from "../controllers/staff.controller.js";

const router = express.Router();

router.post("/store",store);

export default router;