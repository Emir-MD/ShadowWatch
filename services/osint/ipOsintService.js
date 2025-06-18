// services/osint/ipOsintService.js
const axios = require('axios');
require('dotenv').config();

async function searchByIP(ip) {
  try {
    const res = await axios.get(`https://api.abuseipdb.com/api/v2/check`, {
      params: {
        ipAddress: ip,
        maxAgeInDays: 90
      },
      headers: {
        'Key': process.env.ABUSEIPDB_API_KEY,
        'Accept': 'application/json'
      }
    });

    const data = res.data.data;

    return {
      ip: data.ipAddress,
      country: data.countryCode,
      isp: data.isp,
      domain: data.domain,
      usageType: data.usageType,
      abuseConfidenceScore: data.abuseConfidenceScore,
      totalReports: data.totalReports,
      lastReportedAt: data.lastReportedAt
    };
  } catch (error) {
    return {
      error: 'Error al consultar AbuseIPDB',
      detail: error.response?.data || error.message
    };
  }
}

module.exports = { searchByIP };
