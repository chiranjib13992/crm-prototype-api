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
        
    } catch (error) {
        
    }
}

export const getDepartmentById = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteDepartmentById = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}