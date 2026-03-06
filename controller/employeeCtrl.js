import { executeQuery } from "../config/db.js";

export const addEmployee = async (req, res) => {
  try {
    console.log("Received employee data:", req.body);
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
      lastLogin,
      em_status
    } = req.body;

    const sql = `CALL InsertEmployee(?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
      empId,
      fullName,
      email,
      phone,
      password,
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

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message
    });

  }
};