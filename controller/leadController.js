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
  try {
    const { lead_id, followup_type, notes, next_followup } = req.body;
    if (!lead_id || !followup_type) {
      return res.status(400)
        .json({
          success: false,
          message: "lead_id and followup_type are required"
        });
    }
    const sql = ` INSERT INTO lead_followups (lead_id, followup_type, notes, next_followup) VALUES (?, ?, ?, ?) `;
    const values = [lead_id, followup_type, notes || null, next_followup || null];
    const result = await executeQuery(sql, values);
    return res.status(201)
      .json({
        success: true,
        message: "Lead follow-up added successfully",
        followupId: result.insertId
      });
  } catch (error) {
    console.error("Add Followup Error:", error); return res.status(500).json({ success: false, message: "Failed to add follow-up", error: error.message });
  }
}


export const allFollowUps = async (req, res) => {
  try {
    const sql = ` SELECT lf.id, lf.lead_id, lf.followup_type, lf.notes, lf.next_followup, lf.created_at FROM lead_followups lf ORDER BY lf.created_at DESC `;
    const followups = await executeQuery(sql);
    return res.status(200).json({ success: true, message: "Followups fetched successfully", count: followups.length, data: followups });
  } catch (error) {
    console.error("Get Followups Error:", error); return res.status(500).json({ success: false, message: "Failed to fetch followups", error: error.message });
  }
}

export const followUpById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = ` SELECT id, lead_id, followup_type, notes, next_followup, created_at FROM lead_followups WHERE id = ? `;
    const followup = await executeQuery(sql, [id]);
    if (!followup.length) {
      return res.status(404)
        .json({
          success: false,
          message: "Followup not found"
        });
    }
    return res.status(200).json({ success: true, message: "Followup fetched successfully", data: followup[0] });
  } catch (error) {
    console.error("Get Followup By Id Error:", error); return res.status(500).json({ success: false, message: "Failed to fetch followup", error: error.message });
  }
}

export const uploadLeadsFromExcel = async (req, res) => {
  try {
    const leads = req.body;
    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ message: "Invalid leads data" });
    }
    const sql = `CALL InsertLead(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    for (const lead of leads) {

      const values = [
        lead.full_name,
        lead.email,
        lead.phone,
        lead.whatsapp_number,
        lead.destination,
        lead.travel_start_date,
        lead.travel_end_date,
        lead.number_of_travelers,
        lead.adults,
        lead.children,
        lead.budget,
        lead.lead_source,
        lead.lead_status,
        lead.priority || "medium",
        lead.assigned_to,
        lead.last_contact_date || null,
        lead.next_followup_date || null,
        lead.customer_notes,
        lead.internal_notes,
        lead.created_by
      ];

      await executeQuery(sql, values);
    }

    res.status(200).json({
      message: `${leads.length} leads inserted successfully`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lead upload failed" });
  }
}

export const assignLead = async (req, res) => {

}

export const deleteLeadById = async (req, res) => {

}

export const allLeads = async (req, res) => {
  try {
    const sql = `SELECT id, full_name, email, phone, whatsapp_number, destination, travel_start_date, travel_end_date, number_of_travelers, adults, children, lead_source, lead_status, created_at FROM leads ORDER BY created_at DESC `;
    const leads = await executeQuery(sql);
    return res.status(200).json({ success: true, message: "Leads fetched successfully", count: leads.length, data: leads });
  } catch (error) {
    console.error("Get Leads Error:", error); return res.status(500).json({ success: false, message: "Failed to fetch leads", error: error.message });
  }
}