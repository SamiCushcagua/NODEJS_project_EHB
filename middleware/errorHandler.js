
const errorHandler = (err, req, res, next) => {

    console.error('Error', err.stack);


    if (err.name === 'ValidationError') {

        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({

            error: 'Validation error',
            details: errors
        });


    }

    if (err.code === 11000) {
        return res.status(400).json({
            error: 'already existing mail'

        });

    }


    if (err.name === 'CastError') {

        return res.status(400).json({
            error: 'ID Not valid'

        });

    }

    res.status(500).json({
        error: 'Generic Error',
        message: err.massage

    });



};


export default errorHandler















