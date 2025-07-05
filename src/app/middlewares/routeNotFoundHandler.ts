import { NextFunction, Request, Response } from "express"

const routeNotFoundHandler= (req: Request,res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: {
            statusCode: 404,
            path: req.originalUrl
        }
    })
}

export default routeNotFoundHandler;