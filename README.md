# 🕵️‍♂️ ShadowWatch CLI

**ShadowWatch** es una herramienta OSINT interactiva desarrollada en Node.js que permite a analistas de ciberseguridad realizar búsquedas automáticas sobre correos electrónicos, dominios, IPs, palabras clave y Google Dorks desde una interfaz en consola.

Incluye funcionalidad para exportar resultados como archivos `.json` o `.txt`, listos para análisis posterior.

---

## 🚀 Instalación

```bash
git clone https://github.com/Emir-MD/ShadowWatch.git
cd ShadowWatch
npm install
cp .env.example .env  # Luego edita el .env con tus claves API si lo deseas

🧠 Requisitos

    Node.js 18+

    API Key de GitHub 

    API Key de AbuseIPDB 

    API Key de Shodan 

    Servidor ShadowWatch (app.js) corriendo en localhost:4000

🧪 Uso del CLI

Primero, inicia el backend:

npm run dev

Luego, en otra terminal, ejecuta la CLI:

npm start

Verás un menú como este:

🕵️‍♂️ ShadowWatch CLI - Herramienta OSINT

❯ 🔍 Buscar por palabra clave
  📧 Buscar por correo electrónico
  🌐 Buscar por dominio
  🌎 Buscar por IP
  🕸️ Buscar Google Dorks
  ❌ Salir

Tras cada búsqueda, el sistema te preguntará si deseas guardar los resultados y en qué formato (json o txt).

Los archivos se guardan automáticamente en la carpeta exports/.
🧾 Ejemplos rápidos desde CLI
Buscar por IP

🌎 Ingresa la IP: 8.8.8.8
📦 Resultado:
{ ip: '8.8.8.8', isp: 'Google LLC', ... }

✅ Resultado exportado a ./exports/result_ip_8.8.8.8.json

Buscar por palabra clave

🔍 Ingresa la palabra clave: firebaseConfig
📦 Resultado:
{ keyword: 'firebaseConfig', items: [...] }

✅ Resultado exportado a ./exports/result_keyword_firebaseConfig.txt

🔐 Configuración de tokens API

Copia y edita tu archivo .env:

cp .env.example .env

Ejemplo de contenido:

GITHUB_TOKEN=ghp_tu_token
ABUSEIPDB_API_KEY=tu_api_key
SHODAN_API_KEY=tu_api_key

Estos tokens permiten ampliar las fuentes y precisión de los resultados.
📁 Estructura del proyecto

ShadowWatch/
├── cli.js                # Herramienta CLI principal
├── app.js                # Backend Express
├── routes/               # Rutas OSINT
├── controllers/          # Lógica por tipo
├── services/osint/       # Conexión con fuentes OSINT
├── exports/              # Archivos generados por el usuario
├── .env                  # Tus claves (
├── .env.example          # Ejemplo de configuración
├── package.json
└── README.md

🛠️ Mejoras planeadas

Reportes PDF automáticos

Modo "full" con resumen completo

Exportar a CSV

    Integración con Telegram o Discord para alertas

🧑‍💻 Autor

Desarrollado

- Zoe Alexis Cardenas Hernandez
- Aldo Emir Morante Delgado
💻 Hecho para investigadores, Red Team y entornos educativos.
