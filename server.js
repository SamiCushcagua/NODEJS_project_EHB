import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; //laat toe om de api te gebruiken voor andere domeinen
import bodyParser from 'body-parser'; //laat toe om de body van de request te lezen json
import path from 'path'; //laat toe om de static files te serveren
import { fileURLToPath } from 'url';

// Importeer de database configuratie
import connectDB from './config/database.js';

// Importeer de middlewares
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';

        // Importeer de routes
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