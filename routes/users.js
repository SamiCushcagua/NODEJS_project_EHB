import express from "express";
import User from "../models/User.js";


const router = express.Router(); 


//zoek alle users

router.get('/', async(req, res) => {

    const { page = 1, limit = 10, search = '' } = req.query;

    const filter = {};
        if(search){
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
             
            ];
        }


const skip = (page - 1) * limit;

const users = await User.find(filter)
    .skip(skip)
    .limit(limit)
  
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

});

//zoek ID user

router.get('/:id', async(req, res) => {

    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);

});



//maak user

router.post('/', async(req, res) => {

    try {
        
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//update user

router.put('/:id', async(req, res) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
});


//delete user

router.delete('/:id', async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
    
    
});




export default router;
