import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
       
    },
    desc: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
})



const Book = mongoose.model('Book', bookSchema);

export default Book;