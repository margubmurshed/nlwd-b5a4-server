import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookRouter = express.Router();

bookRouter.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const body = req.body;
        const book = await Book.create(body);
        console.log(book)

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch(error){
        next(error)
    } 
})

bookRouter.get("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {filter, sortBy="createdAt", sort, limit=10, page=1} = req.query;

        const query: any = {};

        if(filter){
            query.genre = filter;
        }

        // pagination logic
        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.max(Number(limit), 1);
        const skip = (pageNumber - 1) * limitNumber;
        const total = await Book.countDocuments(query);


        let bookQuery = Book.find(query);

        if(sort === "asc" || sort === "desc"){
            const sortOrder = sort === "asc" ? 1 : -1;
            const sortOptions: any = {};
            sortOptions[sortBy as string] = sortOrder;
            bookQuery = bookQuery.sort(sortOptions)
        }

        bookQuery = bookQuery.skip(skip).limit(limitNumber);

        const books = await bookQuery.exec();


        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: books,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(total/limitNumber)
            }
        })
    } catch(error){
        next(error)
    } 
})

bookRouter.get("/:bookId", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const bookId = req.params.bookId;

        const book = await Book.findById(bookId)


        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch(error){
        next(error)
    } 
})

bookRouter.put("/:bookId", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const bookId = req.params.bookId;
        const body = req.body;
        const book = await Book.findByIdAndUpdate(bookId, body, {new: true, runValidators:true})
        console.log(book)
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        })
    } catch(error){
        next(error)
    } 
})

bookRouter.delete("/:bookId", async(req: Request, res: Response, next: NextFunction) => {
    try{

        const bookId = req.params.bookId;
        console.log(bookId)

        await Book.findByIdAndDelete(bookId)

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch(error){
        next(error)
    } 
})

