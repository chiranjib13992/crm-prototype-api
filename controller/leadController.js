import { executeQuery } from "../config/db.js";

export const createLeadSourse = async (req, res) => {
  try {
    const { source_name } = req.body;

    if (!source_name) {
      return res.status(400).json({
        success: false,
        message: "Lead source name is required"
      });
    }

    const query = `
      INSERT INTO lead_sources (source_name, createdBy)
      VALUES (?,?)
    `;

    const result = await executeQuery(query, [source_name, req.id]);

    res.status(201).json({
      success: true,
      message: "Lead source created successfully",
      data: {
        id: result.insertId,
        source_name
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
export const createLead = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      whatsapp_number,
      destination,
      travel_start_date,
      travel_end_date,
      number_of_travelers,
      adults,
      children,
      budget,
      lead_source,
      lead_status,
      priority,
      assigned_to,
      last_contact_date,
      next_followup_date,
      customer_notes,
      internal_notes,
      created_by
    } = req.body;

    const sql = `CALL InsertLead(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
      full_name,
      email,
      phone,
      whatsapp_number,
      destination,
      travel_start_date,
      travel_end_date,
      number_of_travelers,
      adults,
      children,
      budget,
      lead_source,
      lead_status,
      priority || "medium",
      assigned_to,
      last_contact_date || null,
      next_followup_date || null,
      customer_notes,
      internal_notes,
      created_by
    ];

    await executeQuery(sql, values);

    return res.status(201).json({
      success: true,
      message: "Lead created successfully"
    });

  } catch (err) {
    console.error("Create Lead Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to create lead",
      error: err.message
    });
  }
};

// LEAD FOLLOW UP

export const addLeadFollowUp = async (req, res) => {

}

export const allFollowUps = async (req, res) => {

}

export const followUpById = async (req, res) => {

}

export const uploadLeadsFromExcel = async (req, res) => {
}

export const assignLead = async (req, res) => {

}

export const deleteLeadById = async (req, res) => {

}

export const allLeads = async (req, res) => {

}