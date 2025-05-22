import express from "express";
import { submitScore, getLeaderboard } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/", submitScore);
router.get("/leaderboard", getLeaderboard);

export default router;
