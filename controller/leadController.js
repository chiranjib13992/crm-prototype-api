
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
      VALUES (?)
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

// export const getLeads = async (req, res) => {
//   try {
//     const leads = await prisma.lead.findMany();
//     res.json(leads);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };