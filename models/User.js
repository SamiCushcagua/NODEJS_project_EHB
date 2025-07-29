import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Naam verplicht'],
        trim: true,
        minlength: [2, 'min 2 characters'],
        maxlength: [50, 'max 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email verplicht'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email nietbruikbaar']
    },
    age: {
        type: Number,
        required: [true, 'Leeftijdverplicht'],
        min: [13, 'min leeftijd 13'],
        max: [120, 'max leeftijd']
    },
    bio: {
        type: String,
        maxlength: [500, 'Biografie max 500 characters']
    }
}, {
    timestamps: true
});

// Middleware pre-save para validar que el nombre no contenga números
userSchema.pre('save', function(next) {
    if (this.name && /\d/.test(this.name)) {
        return next(new Error('Naam geen letters'));
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User; 