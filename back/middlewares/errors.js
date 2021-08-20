const ErrorHandler = require('../utils/errorHandler')
//TODO HANDLE MONGOOSE ERRORS

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    // if (process.env.NODE_ENV==='DEVELOPMENT'){
    //     console.error(err)
    //     res.status(err.statusCode).json({
    //         success:false,
    //         error: err,
    //         message: err.message,
    //         stack: err.stack
    //     })
    // }

    
    
    // if (process.env.NODE_ENV==='PRODUCTION'){
        console.error(err)
        let error = {...err}
        error.message= err.message
        res.status(error.statusCode).json({
            success:false,
            message: error.message || 'Internal Server Error'
            
        })
    // }

}