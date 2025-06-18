// controllers/googleDorks.controller.js
const { generateGoogleDorks } = require('../services/osint/googleDorksService');

const googleDorksSearch = async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: 'La palabra clave es obligatoria' });
  }

  const data = await generateGoogleDorks(keyword);
  res.json({ keyword, dorks: data });
};

module.exports = { googleDorksSearch };
