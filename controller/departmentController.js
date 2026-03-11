import { executeQuery } from "../config/db.js";

export const createDepartment = async (req, res) => {
    try {

        const { name, status } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Department name is required"
            });
        }

        const query = `
            INSERT INTO departments (name, status)
            VALUES (?, ?)
        `;

        const values = [name, status || 'active'];

        const result = await executeQuery(query, values);

        return res.status(201).json({
            success: true,
            message: "Department created successfully",
            departmentId: result.insertId
        });

    } catch (error) {
        console.error("Create Department Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getAllDepartment = async (req, res) => {
    try {
        const sql = `SELECT id, name, status, createdAt FROM departments ORDER BY id DESC`;
        const departments = await executeQuery(sql); return res.status(200).json({ success: true, message: "Departments fetched successfully", count: departments.length, data: departments });
    } catch (error) {
        console.error("Get Department Error:", error); return res.status(500).json({ success: false, message: "Failed to fetch departments", error: error.message });
    }
}

export const getDepartmentById = async (req, res) => {
    try {
        const sql = `SELECT id, name, status, createdAt FROM departments WHERE id = ${req.params.id}`;
        const department = await executeQuery(sql); return res.status(200).json({ success: true, message: "Department fetched successfully", department });
    } catch (error) {
        console.error("Get Department Error:", error); return res.status(500).json({ success: false, message: "Failed to fetch departments", error: error.message });
    }
}

export const deleteDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const checkSql = `SELECT id FROM departments WHERE id = ${id}`;
        const department = await executeQuery(checkSql);
        if (!department.length) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        const deleteSql = `DELETE FROM departments WHERE id = ${id}`;
        await executeQuery(deleteSql);
        return res.status(200).json({ success: true, message: "Department deleted successfully" });
    } catch (error) {
        console.error("Delete Department Error:", error); return res.status(500).json({ success: false, message: "Failed to delete department", error: error.message });
    }
}