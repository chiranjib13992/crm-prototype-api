import { Router } from "express";
import upload from "../middleware/upload.js";
import { addUser } from "../controller/userCtrl.js";
import { addEmployee, empLogin } from "../controller/employeeCtrl.js";
import { createLead, createLeadSourse } from "../controller/leadController.js";
import { verifyJwtEmpToken } from "../config/jwtConfig.js";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

router.post('/add-user', addUser);

//Employee
router.post('/add-employee', addEmployee);
router.post('/login-employee', empLogin)


//LEADS

router.post('/create-leadSource', verifyJwtEmpToken, createLeadSourse);
router.post('/create-lead', verifyJwtEmpToken, createLead);

export default router;
