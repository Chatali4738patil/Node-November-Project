import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;

        next();

    } 
    catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const isAdmin = (req, res, next) => {

    if(req.user?.role !== 'admin'){
        return res.status(401).json({ message: "Forbidden: Admins only" });
    }

    next();
}