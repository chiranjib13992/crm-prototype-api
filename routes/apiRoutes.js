import { Router } from "express";
import upload from "../middleware/upload.js";
import { addUser } from "../controller/userCtrl.js";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

router.post("/add-user", addUser);

export default router;
