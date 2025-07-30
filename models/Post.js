import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Moet een titel hebben'],
        trim: true,
        minlength: [5, 'minstens 5 letters'],
        maxlength: [100, 'max 100 letters']
    },
    content: {
        type: String,
        required: [true, 'Content verplicht'],
        minlength: [10, 'Min 10 characters'],
        maxlength: [5000, 'max 5000 characters']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //ID van de gebruiker
        ref: 'User', //referentie naar de User model
        required: [true, 'verplicht auteur']
    },
    category: {
        type: String,
        required: [true, 'Category verplicht'],
        enum: ['tech', 'sport', 'politics', 'entretaiment', 'andere']
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

// zoeken met index
postSchema.index({ title: 'text', content: 'text' });

const Post = mongoose.model('Post', postSchema);

export default Post; 