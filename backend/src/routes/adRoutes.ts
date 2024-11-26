import express from "express";
import { getAds, createAd } from "../controllers/adController";

const router = express.Router();

router.get("/", getAds);
router.post("/", createAd);

export default router;
