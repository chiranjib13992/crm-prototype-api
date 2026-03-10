import jwt from "jsonwebtoken";
import { executeQuery } from "../config/db.js";

export const verifyJwtEmpToken = async (req, res, next) => {
  try {
    let token;

    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [emp] = await executeQuery(
      "SELECT * FROM employees WHERE id = ?",
      [decoded.id]
    );

    if (!emp) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed"
      });
    }

    // attach user to request
    req.emp = emp;
    req.id = emp.id;

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token authentication failed",
      error: err.message
    });
  }
};