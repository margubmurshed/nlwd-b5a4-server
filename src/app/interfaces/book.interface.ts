import { Model, Types } from "mongoose";

export interface IBookStaticMethods extends Model<IBook>{
    borrowBook(bookId: Types.ObjectId, quantity: number) : Promise<IBook>;
}
export interface IBook {
    title: string;
    author: string;
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
}