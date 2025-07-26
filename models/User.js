import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'El nombre no puede exceder 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
        min: [13, 'La edad mínima es 13 años'],
        max: [120, 'La edad máxima es 120 años']
    },
    bio: {
        type: String,
        maxlength: [500, 'La biografía no puede exceder 500 caracteres']
    }
}, {
    timestamps: true
});

// Middleware pre-save para validar que el nombre no contenga números
userSchema.pre('save', function(next) {
    if (this.name && /\d/.test(this.name)) {
        return next(new Error('El nombre no puede contener números'));
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User; 