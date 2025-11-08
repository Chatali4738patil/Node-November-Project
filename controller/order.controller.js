import Order from "../model/order.model.js";
import Book from "../model/book.model.js";
import User from "../model/user.model.js";

// Place a new order
export const placeOrder = async (req, res) => {
    try {

        const userId = req.user._id;

        const { books } = req.body;

        // Fetch books to calculate total price
       if (!books?.length) {
            return res.status(400).json({ message: "No books provided for the order" });
        }

        let totalPrice = 0;
        const orderedBooks = [];

        for(const {bookId, quantity} of books){
            const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book Not Found" });
        }

         if(book.stock < quantity){
                return res.status(400).json({ message: `Insufficient stock for book: ${book.title}` });
        }
            
            totalPrice += book.price * quantity;
            orderedBooks.push(book._id);
        
            // Decrease book stock
            book.stock -= quantity;
            await book.save();

        }

        const order = await Order.create({
            user: userId,
            book: orderedBooks,
            totalPrice,
            status: 'placed'
        });

        await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

        //const token = generateToken(req.user._id, req.user.role);

        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully", 
            order
        });
        
        
    } catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get orders for a user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await Order.find({ user: userId }).populate('book');

        res.status(200).json({ 
            success: true, 
            orders 
        });
        
    } catch (error) {
        console.error("Error in getUserOrders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('book').populate('user', 'username email');

        res.status(200).json({ 
            success: true, 
            orders 
        });
        
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['placed', 'shipped', 'delivered', 'cancel'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order Not Found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ 
            success: true, 
            message: "Order status updated", 
            order 
        });
        
    } catch (error) {
        console.error("Error in updateOrderStatus:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate("book", "title author price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error("Get order history error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
