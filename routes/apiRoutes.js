import { Router } from "express";
import upload from "../middleware/upload.js";
import { addUser } from "../controller/userCtrl.js";
import { addEmployee } from "../controller/employeeCtrl.js";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

router.post("/add-user", addUser);
router.post("/add-employee", addEmployee);

export default router;
