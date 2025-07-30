

import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js'; 

const router = express.Router();




router.get('/', async (req, res) => {

    const { 
        page = 1, 
        limit = 10, 
        search = '', 
        category = '',
        author = '',
        sortBy = 'createdAt', 
        sortOrder = 'desc' 
    } = req.query;

   
    const filter = {};
    
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
        ];
    }
    
  
    if (category) {
        filter.category = category;
    }
    
   
    if (author) {
        filter.author = author;
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

   
    const posts = await Post.find(filter)
        .populate('author', 'name email')
        .sort(sort)
        .limit(Number(limit))
        .skip(Number(skip));


    const total = await Post.countDocuments(filter);


    res.json({
        posts,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / limit)
        }
    });
});


//get post by id

router.get('/:id', async (req, res) => {
    try {
      
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email');
        
        if (!post) {
            return res.status(404).json({ error: 'Post niet gevonden' });
        }
        
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// nieuwe post

router.post('/', async (req, res) => {
    try {
       
        const author = await User.findById(req.body.author);
        if (!author) {
            return res.status(400).json({ 
                error: 'El autor especificado no existe' 
            });
        }
        
      
        const post = new Post(req.body);
        await post.save();
        
        
        await post.populate('author', 'name email');
        
       
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});





//update post

router.put('/:id', async (req, res) => {
    try {
       
        const post = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body,      
            { 
                new: true,           
                runValidators: true  
            }
        ).populate('author', 'name email'); 
        
        if (!post) {
            return res.status(404).json({ error: 'Post niet gevonden   ' });
        }
        
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//delete post

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        
        if (!post) {
            return res.status(404).json({ error: 'Post niet gevonden' });
        }
        
            res.json({ message: 'Post verwijderd' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get posts by user

router.get('/author/:authorId', async (req, res) => {
    try {
       
        const posts = await Post.find({ author: req.params.authorId })
            .populate('author', 'name email') 
            .sort({ createdAt: -1 });        
        
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




export default router;