import Book from "../model/book.model.js";

import cloudinary from "../config/cloud.js";

export const addBook = async (req, res) => {
    try {
        const { title, author, price, desc, stock, language} = req.body;

        if (!title || !author || !price || !desc || !stock || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let imageUrl = undefined;
        if (req.file) {
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}` // Assuming you're using multer and the file is stored locally4
            const uploadResult = await cloudinary.uploader.upload(base64Image, {
                folder: 'books',
            });
            imageUrl = uploadResult.secure_url;
        } else {
            console.error("Error in addImage:", error);
            return res.status(400).json({ message: "Image is required" });
        }

        const newBook = await Book.create({
            title,
            author,
            price,
            desc,
            stock,
            language,
            imageUrl
        });

        res.status(201).json({ success: true, message: "Book added successfully", newBook });
    } catch (error) {
        console.error("Error in addBook:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true, 
            count: books.length,
            books 
        });
    } catch (error) {
        console.error("Error in getBooks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ 
                success: false, 
                message: "Book not found" });
        }

        res.status(200).json({ success: true, book });
    } catch (error) {
        console.error("Error in getBookById:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" });
    }
};



export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ success: true, message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        console.error("Error in updateBook:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error in deleteBook:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

