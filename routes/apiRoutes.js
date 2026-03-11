import { Router } from "express";
import upload from "../middleware/upload.js";
import { addUser } from "../controller/userCtrl.js";
import { addEmployee, deleteEmployee, empLogin } from "../controller/employeeCtrl.js";
import { addLeadFollowUp, allFollowUps, allLeads, assignLead, createLead, createLeadSourse, deleteLeadById, followUpById, uploadLeadsFromExcel } from "../controller/leadController.js";
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
router.post('/login-employee', empLogin);
router.delete('/delete-employee/:id', verifyJwtEmpToken, deleteEmployee);



//LEADS

router.post('/leads/create-leadSource', verifyJwtEmpToken, createLeadSourse);
router.get('/leads', verifyJwtEmpToken, allLeads);
router.post('/leads/create-lead', verifyJwtEmpToken, createLead);
router.post('/leads/upload-excel', verifyJwtEmpToken, uploadLeadsFromExcel);
router.post('/leads/assign', verifyJwtEmpToken, assignLead);
router.delete('leads/:id', verifyJwtEmpToken, deleteLeadById);
router.post('/leads/followups', verifyJwtEmpToken, addLeadFollowUp);
router.get('/leads/followups', verifyJwtEmpToken, allFollowUps);
router.get('/leads/followups/:id', verifyJwtEmpToken, followUpById);


//DEPARTMENT
router.post('/create-department', verifyJwtEmpToken, createDepartment);
router.get('/all-departments', verifyJwtEmpToken, getAllDepartment);
router.get('/department/:id', verifyJwtEmpToken, getDepartmentById);
router.delete('/department/:id', deleteDepartmentById);


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
