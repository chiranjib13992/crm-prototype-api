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

    const [user] = await executeQuery(
      "SELECT * FROM users WHERE user_id = ?",
      [decoded.user_id]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed"
      });
    }

    // attach user to request
    req.user = user;
    req.user_id = user.user_id;

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token authentication failed",
      error: err.message
    });
  }
};