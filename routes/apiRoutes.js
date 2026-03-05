import { Router } from "express";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

export default router;
