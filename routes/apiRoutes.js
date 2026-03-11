import { Router } from "express";
import upload from "../middleware/upload.js";
import { addUser } from "../controller/userCtrl.js";
import { addEmployee, empLogin } from "../controller/employeeCtrl.js";
import { createLead, createLeadSourse } from "../controller/leadController.js";
import { verifyJwtEmpToken } from "../config/jwtConfig.js";
import { createDepartment, deleteDepartmentById, getAllDepartment, getDepartmentById } from "../controller/departmentController.js";
import { assignPermissionsToRole, createRole, getRoles } from "../controller/roleController.js";
import { employeeReport, leadReport, sourceReport, teamReport } from "../controller/reportController.js";

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


//DEPARTMENT
router.post('/create-department', verifyJwtEmpToken, createDepartment);
router.get('/all-department', verifyJwtEmpToken, getAllDepartment);
router.get('/department/:id', verifyJwtEmpToken, getDepartmentById);
router.delete('/department/:id', verifyJwtEmpToken, deleteDepartmentById);


//ROLES

router.post('/create-role', verifyJwtEmpToken, createRole);
router.get('/getRoles', verifyJwtEmpToken, getRoles);
router.post('/roles/assign-permissions', verifyJwtEmpToken, assignPermissionsToRole);


//REPORTS

router.get('/reports/leads', verifyJwtEmpToken, leadReport);
router.get('/reports/employees', verifyJwtEmpToken, employeeReport);
router.get('/reports/team', verifyJwtEmpToken, teamReport);
router.get('/reports/source', verifyJwtEmpToken, sourceReport);

export default router;
