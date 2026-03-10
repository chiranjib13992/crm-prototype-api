import { executeQuery } from "../config/db.js";
import passport from "../config/passportConfig.js";
import bcrypt from "bcrypt";


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
      department,
      profileImage,
      em_status
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `CALL InsertEmployee(?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
      empId,
      fullName,
      email,
      phone,
      hashedPassword,
      role || "sales",
      status || "active",
      department,
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

        return res.status(200).json({
          success: true,
          message: "Login successful",
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