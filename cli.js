#!/usr/bin/env node

const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
require('dotenv').config();

const BASE_URL = 'http://localhost:4000/api/osint';

function ensureExportDir() {
  const exportDir = path.join(__dirname, 'exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }
}

function saveResultToFile(type, input, data, format = 'json') {
  ensureExportDir();

  const safeInput = input.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filename = `result_${type}_${safeInput}.${format}`;
  const filepath = path.join(__dirname, 'exports', filename);

  if (format === 'json') {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  } else {
    const text = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
    fs.writeFileSync(filepath, text);
  }

  console.log(`\n✅ Resultado exportado a ${chalk.green(filepath)}\n`);
}

async function run() {
  console.clear();
  console.log('\n🕵️‍♂️ ShadowWatch CLI - Herramienta OSINT\n');

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: '¿Qué tipo de búsqueda OSINT deseas realizar?',
      choices: [
        '🔍 Buscar por palabra clave',
        '📧 Buscar por correo electrónico',
        '🌐 Buscar por dominio',
        '🌎 Buscar por IP',
        '🕸️ Buscar Google Dorks',
        '❌ Salir'
      ]
    }
  ]);

  switch (option) {
    case '🔍 Buscar por palabra clave':
      await promptAndFetch('keyword', 'Ingresa la palabra clave');
      break;
    case '📧 Buscar por correo electrónico':
      await promptAndFetch('email', 'Ingresa el correo electrónico');
      break;
    case '🌐 Buscar por dominio':
      await promptAndFetch('domain', 'Ingresa el dominio (ej. example.com)');
      break;
    case '🌎 Buscar por IP':
      await promptAndFetch('ip', 'Ingresa la IP');
      break;
    case '🕸️ Buscar Google Dorks':
      await promptAndFetch('dorks', 'Ingresa la palabra clave para Google Dorks');
      break;
    case '❌ Salir':
      console.log('\n👋 Hasta luego.');
      process.exit();
  }

  const { repeat } = await inquirer.prompt([
    { type: 'confirm', name: 'repeat', message: '¿Deseas realizar otra búsqueda?', default: true }
  ]);

  if (repeat) {
    run();
  } else {
    console.log('\n👋 Fin de sesión.');
    process.exit();
  }
}

async function promptAndFetch(type, message) {
  const { input } = await inquirer.prompt([
    { type: 'input', name: 'input', message }
  ]);

  try {
    const res = await axios.post(`${BASE_URL}/${type}`, {
      [type === 'dorks' ? 'keyword' : type]: input
    });

    console.log('\n📦 Resultado:\n');
    console.dir(res.data, { depth: null, colors: true });

    const { save } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'save',
        message: '¿Deseas guardar este resultado en un archivo?',
        default: true
      }
    ]);

    if (save) {
      const { format } = await inquirer.prompt([
        {
          type: 'list',
          name: 'format',
          message: 'Formato de exportación:',
          choices: ['json', 'txt']
        }
      ]);

      saveResultToFile(type, input, res.data, format);
    }

  } catch (err) {
    console.error('\n❌ Error al hacer la consulta:\n', err.message);
  }
}

run();
