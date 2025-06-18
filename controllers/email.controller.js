// controllers/email.controller.js
const { searchByEmail } = require('../services/osint/emailOsintService');

const emailSearch = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'El email es obligatorio' });
  }

  const data = await searchByEmail(email);
  res.json({ email, data });
};

module.exports = { emailSearch };
