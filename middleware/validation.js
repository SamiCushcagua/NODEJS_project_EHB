
const validateUser = (req, res, next) => {


    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({
            error: 'alles moet ingevultworden',
            required: ['name', 'email', 'age']

        });

    }

    if (typeof age !== 'number' || age < 13 || age > 120) {
        return res.status(400).json({
            error: 'nummer moet tussen 13 en 120 blijven'
        });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Email niet goed'
        });
    }


    if (/\d/.test(name)) {
        return res.status(400).json({
            error: 'naam geen nummers'
        });
    }


    next();

};





// Middleware Post
const validatePost = (req, res, next) => {
    const { title, content, author, category } = req.body;
    
 
    if (!title || !content || !author || !category) {
        return res.status(400).json({
            error: 'alle velden moeten ingevuld worden',
            required: ['title', 'content', 'author', 'category']
        });
    }
    
   //titel lengte
    if (title.length < 5 || title.length > 100) {
        return res.status(400).json({
            error: 'titel moet tussen 5 en 100 karakters blijven'
        });
    }
    
    // content lengte
    if (content.length < 10 || content.length > 5000) {
        return res.status(400).json({
            error: 'content moet tussen 10 en 5000 karakters blijven'
        });
    }
    
    // 4. categories valideren
    const validCategories = ['tech', 'sport', 'politics', 'entretaiment', 'andere'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({
            error: 'Not Valid Cat',
            validCategories: validCategories
        });
    }
    
    // 
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(author)) {
        return res.status(400).json({
            error: 'ID auteur niet OK'
        });
    }
    
    next();
};

export { validateUser, validatePost };




