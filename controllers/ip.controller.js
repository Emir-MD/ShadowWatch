// controllers/ip.controller.js
const { searchByIP } = require('../services/osint/ipOsintService');

const ipSearch = async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: 'IP requerida' });
  }

  const result = await searchByIP(ip);
  res.json(result);
};

module.exports = { ipSearch };
