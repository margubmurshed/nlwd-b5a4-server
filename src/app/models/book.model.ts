import { model, Schema } from "mongoose";
import { IBook, IBookStaticMethods } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                return !/\d/.test(value)
            },
            message: "Title should not contain numbers"
        },
        trim: true
    },
    author: { type: String, required: true, trim: true },
    genre: { type: String, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], required: true, uppercase: true },
    isbn: {
        type: String, unique: [true, "This ISBN is used before. ISBN number can't be duplicated"], required: true,
        validate: {
            validator: function (value: string) {
                return /^\d{13}$/.test(value)
            }, message: "ISBN must be a 13-digit numeric string"
        }
    },
    description: { type: String },
    copies: {
        type: Number, min: [0, "Copies must be a non-negative number"], required: true, validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer value"
        }
    },
    available: { type: Boolean, default: true }
}, { versionKey: false, timestamps: true })

bookSchema.pre("save", function (next) {
    this.available = this.copies > 0;
    next();
})

bookSchema.statics.borrowBook = async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId);
    console.log(bookId, book)

    if (!book) {
        throw new Error("No book found!")
    }

    if (book.copies < quantity) {
        throw new Error("Not enough copies available!")
    }

    if (!book.available) {
        throw new Error("Book is not available for borrowing!")
    }

    book.copies = book.copies - quantity;
    if (book.copies === 0) {
        book.available = false;
    }

    await book.save();
    return book;
}

export const Book = model<IBook, IBookStaticMethods>("book", bookSchema);