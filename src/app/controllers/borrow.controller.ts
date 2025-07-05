import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

export const borrowRouter = express.Router();

borrowRouter.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {book: bookId, quantity, dueDate} = req.body; 
        const book = await Book.borrowBook(bookId, quantity);
        const borrow = await Borrow.create({
            book,
            quantity,
            dueDate
        })

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        })
    } catch(error){
        next(error)
    } 
})

borrowRouter.get("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        
        const summary = await Borrow.aggregate([
            {$group: {_id: "$book", totalQuantity: {$sum: "$quantity"}}},
            {$lookup: {from: "books", localField: "_id", foreignField: "_id", as: "book"}},
            {$unwind: "$book"},
            {$project: {"book.title": 1, "book.isbn":1, totalQuantity:1, _id:0}}
        ])

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        })
    } catch(error){
        next(error)
    } 
})