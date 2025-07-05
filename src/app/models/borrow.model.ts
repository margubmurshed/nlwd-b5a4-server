import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>({
    book: { type: Schema.Types.ObjectId, required: true },
    quantity: {
        type: Number,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer value!"
        }, 
        required: true
    },
    dueDate: { type: Date, required: true }
}, {versionKey: false, timestamps: true})

borrowSchema.post('save', async function(doc, next) {
    const book = await Book.findById(this.book);
    console.log(`Book "${book?.title}" is borrowed. Quantity is ${doc.quantity}`);
    next()
})

export const Borrow = model("borrow", borrowSchema);
