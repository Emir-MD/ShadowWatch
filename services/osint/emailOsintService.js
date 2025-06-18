// services/osint/emailOsintService.js
async function searchByEmail(email) {
  const results = [];

  // Google Dork link
  results.push({
    source: 'Google Dorks',
    url: `https://www.google.com/search?q=intext:${email}+site:pastebin.com`,
    note: 'Busca posibles leaks en Pastebin con ese correo'
  });

  // crt.sh con @dominio (si el email tiene uno)
  const domain = email.split('@')[1];
  if (domain) {
    results.push({
      source: 'crt.sh',
      url: `https://crt.sh/?q=%25${domain}%25`,
      note: 'Busca certificados SSL con ese dominio'
    });
  }

  // (opcional futuro) Integrar HIBP o Hunter.io

  return results;
}

module.exports = { searchByEmail };
