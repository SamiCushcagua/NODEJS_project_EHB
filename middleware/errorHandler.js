
const errorHandler = (err, req, res, next) => {

    console.error('Error', err.stack);


    if (err.name === 'ValidationError') {

        const errors = Object.values(err.errors).map(error => error.massage);
        return res.status(400).json({

            error: 'Validation error',
            details: errors
        });


    }

    if (erro.code === 11000) {
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















