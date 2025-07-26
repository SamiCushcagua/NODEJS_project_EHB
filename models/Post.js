import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: [5, 'El título debe tener al menos 5 caracteres'],
        maxlength: [100, 'El título no puede exceder 100 caracteres']
    },
    content: {
        type: String,
        required: [true, 'El contenido es obligatorio'],
        minlength: [10, 'El contenido debe tener al menos 10 caracteres'],
        maxlength: [5000, 'El contenido no puede exceder 5000 caracteres']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor es obligatorio']
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['tecnología', 'deportes', 'política', 'entretenimiento', 'otros']
    },
    tags: [{
        type: String,
        trim: true
    }],
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Índice para búsquedas eficientes
postSchema.index({ title: 'text', content: 'text' });

const Post = mongoose.model('Post', postSchema);

export default Post; 