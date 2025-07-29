import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar configuración de base de datos
import connectDB from './config/database.js';

// Importar middlewares
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';

// Importar rutas
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Connect met mongooDB
connectDB();

// Middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de logging
app.use(logger);

// Servir archivos estáticos
app.use(express.static('public'));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Root Index info
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware errorhandeling
app.use(errorHandler);

// start server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;