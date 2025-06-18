// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
const osintRoutes = require('./routes/osint.routes');
app.use('/api/osint', osintRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('✅ ShadowWatch API corriendo');
});

const emailRoutes = require('./routes/email.routes');
app.use('/api/osint/email', emailRoutes);

const googleDorksRoutes = require('./routes/googleDorks.routes');
app.use('/api/osint/dorks', googleDorksRoutes);


const ipRoutes = require('./routes/ip.routes');
app.use('/api/osint/ip', ipRoutes);

const domainRoutes = require('./routes/domain.routes');
app.use('/api/osint/domain', domainRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚨 ShadowWatch API activa en el puerto ${PORT}`);
});
