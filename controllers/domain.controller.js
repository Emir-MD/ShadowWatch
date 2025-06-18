// controllers/domain.controller.js
const { searchByDomain } = require('../services/osint/domainOsintService');

const domainSearch = async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: 'El dominio es obligatorio' });
  }

  const data = await searchByDomain(domain);
  res.json({ domain, data });
};

module.exports = { domainSearch };
