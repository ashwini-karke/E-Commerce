import express from "express";
import { 
  createOrder, 
  getOrders, 
  updateOrderStatus 
} from "../controllers/orderController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - invoiceNumber
 *               - items
 *               - totalAmount
 *               - shippingAddress
 *               - paymentDetails
 *             properties:
 *               invoiceNumber:
 *                 type: string
 *                 description: Unique invoice number for the order
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               totalAmount:
 *                 type: number
 *               shippingAddress:
 *                 type: string
 *               paymentDetails:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Server error
 */
router.post("/create", protect, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders (admin gets all, users get their own)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: The ID of the order to fetch
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter orders by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter orders by category
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Unauthorized, token required
 *       404:
 *         description: No orders found
 */
router.get("/", protect, getOrders);

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status (admin only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Shipped, Delivered, Cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.patch("/:orderId/status", protect, adminOnly, updateOrderStatus);

export default router;
