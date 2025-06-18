// services/osint/keywordOsintService.js
const axios = require('axios');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

async function searchByKeyword(keyword) {
  const results = [];

  // Google Dorks (simulado como enlace)
  results.push({
    source: 'Google Dorks',
    url: `https://www.google.com/search?q=site:pastebin.com+${keyword}`,
    note: 'Busca posibles filtraciones en Pastebin'
  });

  // GitHub API
  try {
    const githubRes = await axios.get(`https://api.github.com/search/code?q=${keyword}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });

    results.push({
      source: 'GitHub',
      total: githubRes.data.total_count,
      items: githubRes.data.items.slice(0, 5).map(item => ({
        name: item.name,
        repo: item.repository.full_name,
        url: item.html_url
      }))
    });
  } catch (err) {
    results.push({ source: 'GitHub', error: 'Error al consultar GitHub', detail: err.message });
  }

  // crt.sh
  results.push({
    source: 'crt.sh',
    url: `https://crt.sh/?q=%25${keyword}%25`,
    note: 'Buscar dominios relacionados con certificados SSL'
  });

  return results;
}

module.exports = { searchByKeyword };
