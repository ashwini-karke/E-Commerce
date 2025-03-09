import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     description: Adds a product to the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: [] # Requires JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "67cc208850cf854b34001008"
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       400:
 *         description: Bad request, invalid product ID or quantity
 *       401:
 *         description: Unauthorized, token required
 */
router.post("/add", protect, addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the user's cart
 *     description: Fetches all items in the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *       401:
 *         description: Unauthorized, token required
 *       500:
 *         description: Server error
 */
router.get("/", protect, getCart);

/**
 * @swagger
 * /api/cart/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     description: Removes a specific product from the user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove from the cart
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       400:
 *         description: Bad request, invalid product ID
 *       401:
 *         description: Unauthorized, token required
 *       404:
 *         description: Product not found in cart
 */
router.delete("/remove/:productId", protect, removeFromCart);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear the user's cart
 *     description: Removes all items from the user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Unauthorized, token required
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.delete("/clear", protect, clearCart);

export default router;
