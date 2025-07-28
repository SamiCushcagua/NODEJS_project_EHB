import express from "express";
import User from "../models/User.js";
import { validateUser } from '../middleware/validation.js';

const router = express.Router();

// GET /api/users - Obtener todos los usuarios
router.get('/', async(req, res, next) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const filter = {};
        if(search){
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const users = await User.find(filter)
            .skip(skip)
            .limit(limit);
        
        const total = await User.countDocuments(filter);

        res.json({
            users,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
});

// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// POST /api/users - Crear usuario (CON VALIDACIÓN)
router.post('/', validateUser, async(req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// PUT /api/users/:id - Actualizar usuario (CON VALIDACIÓN)
router.put('/:id', validateUser, async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/users/:id - Eliminar usuario
router.delete('/:id', async(req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

export default router;