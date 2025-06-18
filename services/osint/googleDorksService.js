// services/osint/googleDorksService.js
async function generateGoogleDorks(keyword) {
  const dorks = [
    {
      dork: `site:pastebin.com ${keyword}`,
      note: 'Buscar filtraciones en Pastebin'
    },
    {
      dork: `intitle:"index of" ${keyword}`,
      note: 'Buscar directorios abiertos'
    },
    {
      dork: `filetype:env ${keyword}`,
      note: 'Buscar archivos .env expuestos'
    },
    {
      dork: `filetype:json ${keyword}`,
      note: 'Buscar archivos JSON (claves, config)'
    },
    {
      dork: `site:github.com ${keyword}`,
      note: 'Buscar código con la keyword en GitHub'
    },
    {
      dork: `site:*.${keyword}`,
      note: 'Buscar subdominios (si keyword es dominio)'
    }
  ];

  return dorks.map(d => ({
    dork: d.dork,
    url: `https://www.google.com/search?q=${encodeURIComponent(d.dork)}`,
    note: d.note
  }));
}

module.exports = { generateGoogleDorks };
