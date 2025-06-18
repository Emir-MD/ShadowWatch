// controllers/osint.controller.js
const { searchByKeyword } = require('../services/osint/keywordOsintService');

const keywordSearch = async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: 'La palabra clave es obligatoria.' });
  }

  try {
    const data = await searchByKeyword(keyword);
    res.json({ keyword, data });
  } catch (error) {
    console.error('Error en búsqueda OSINT:', error);
    res.status(500).json({ error: 'Error interno en el servidor.' });
  }
};

module.exports = { keywordSearch };
