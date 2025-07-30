import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Naam verplicht'],
        trim: true, //verwijdert spaties aan het begin en einde van de string
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
    timestamps: true //maakt een createdAt en updatedAt veld aan
});

// middleware voor de save functie
userSchema.pre('save', function(next) {
    if (this.name && /\d/.test(this.name)) {
        return next(new Error('Naam mag geen cijfers bevatten'));
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User; 