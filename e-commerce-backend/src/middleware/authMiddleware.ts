import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; isAdmin: boolean }; // ✅ Use isAdmin instead of role
  }
}

// Protect routes (Ensure user is authenticated)
// Protect routes (Ensure user is authenticated)
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    // Find user and attach to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user._id.toString(), isAdmin: user.isAdmin }; // ✅ Use isAdmin instead of role

    next(); // Call next() only if authentication is successful
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};


// Restrict access to admins only
export const adminOnly = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (!req.user) return res.status(401).json({ message: "Not authorized" });

  const user = await User.findById(req.user.id);
  if (!user || !user.isAdmin) { // ✅ Check isAdmin field
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

