import { executeQuery } from "../config/db.js";

export const addUser = async (req, res) => {
    try {

        const {
            fullname,
            email,
            phone,
            alternativenum,
            dob,
            user_address,
            city,
            user_state,
            country,
            pincode,
            source,
            is_from_lead,
            note,
            assigned_employeeid
        } = req.body;

        const sql = `CALL insert_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const values = [
            fullname,
            email,
            phone,
            alternativenum,
            dob,
            user_address,
            city,
            user_state,
            country,
            pincode,
            source,
            is_from_lead,
            note,
            assigned_employeeid,
            'active'
        ];

        await executeQuery(sql, values);

        return res.status(200).json({
            success: true,
            message: "User added successfully"
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