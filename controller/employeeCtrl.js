import { executeQuery } from "../config/db.js";
import passport from "../config/passportConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const addEmployee = async (req, res) => {
  try {
    const {
      empId,
      fullName,
      email,
      phone,
      password,
      role,
      status,
      department_id,
      profileImage,
      em_status
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const counterResult = await executeQuery(`SELECT count FROM counter WHERE name = 'emp'`);
    const currentCount = counterResult[0].count;
    const employeeId = `CRM${currentCount}`;
    await executeQuery(`UPDATE counter SET count = count + 1 WHERE name = 'emp'`);

    const sql = `CALL InsertEmployee(?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
      employeeId,
      fullName,
      email,
      phone,
      hashedPassword,
      role || "sales",
      status || "active",
      department_id,
      profileImage,
      new Date(),
      em_status || "probation"
    ];

    const result = await executeQuery(sql, values);

    return res.status(200).json({
      success: true,
      message: "Employee added successfully",
      data: result
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};

export const empLogin = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Authentication error",
          error: err.message
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || "Invalid credentials"
        });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Login failed",
            error: err.message
          });
        }

        const token = generateJwt(user);

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.fullName,
            email: user.email,
            role: user.role
          }
        });
      });
    })(req, res, next);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};


function generateJwt(emp) {
  return jwt.sign(
    { id: emp.id, email: emp.email, name: emp.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}


//modifed by need to add in main prod system
export const activeInactiveEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const checkSql = `SELECT status FROM employees WHERE id = ?`;
    const employee = await executeQuery(checkSql, [id]);
    if (!employee.length) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }
    const currentStatus = employee[0].status;
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const updateSql = `UPDATE employees SET status = ? WHERE id = ?`; await executeQuery(updateSql, [newStatus, id]);
    return res.status(200).json({ success: true, message: `Employee status updated to ${newStatus}` });

  } catch (error) {
    console.error("Employee Status Update Error:", error); return res.status(500).json({ success: false, message: "Failed to update employee status", error: error.message });
  }
}