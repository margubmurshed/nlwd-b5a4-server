import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
    let statusCode = 500;
    let message = err.message || "Something went wrong";
    let error = err;

    if(err.name === "ValidationError"){
        statusCode = 400;
        message = "Validation failed"
        error = {
            errors: err.errors,
            name: err.name
        }
    }

    if(err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
        error = {
            errors: err.errors,
            name: err.name
        }
    }


    res.status(statusCode).json({
        success: false,
        message,
        error: error
    })
}

export default globalErrorHandler;