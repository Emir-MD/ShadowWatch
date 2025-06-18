// services/osint/domainOsintService.js

async function searchByDomain(domain) {
  const results = [];

  // crt.sh
  results.push({
    source: 'crt.sh',
    url: `https://crt.sh/?q=%25${domain}%25`,
    note: 'Buscar certificados SSL emitidos para el dominio'
  });

  // WHOIS Lookup (web pública)
  results.push({
    source: 'Whois Lookup',
    url: `https://who.is/whois/${domain}`,
    note: 'Verifica registros de propiedad del dominio'
  });

  // DNSdumpster
  results.push({
    source: 'DNSdumpster',
    url: `https://dnsdumpster.com/`,
    note: 'Buscar infraestructura y subdominios (manual, requiere pegar el dominio)'
  });

  return results;
}

module.exports = { searchByDomain };
