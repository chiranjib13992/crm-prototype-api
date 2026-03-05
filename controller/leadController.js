const prisma = require('../config/db');

const getLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getLeads };