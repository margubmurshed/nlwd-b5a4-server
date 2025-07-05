import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routeNotFoundHandler from './app/middlewares/routeNotFoundHandler';
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
import cors from "cors";
import 'dotenv/config';

const app: Application = express();

app.use(express.json())
app.use(cors())

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.use(routeNotFoundHandler)
app.use(globalErrorHandler)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to my Library Management App")
})

export default app;