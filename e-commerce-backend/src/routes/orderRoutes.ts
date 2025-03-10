import express from "express";
import { 
  createOrder, 
  getOrders, 
  getOrderDetails, 
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
 *     summary: Get all orders for the user (admin gets all orders)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
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
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order details by ID (users get their own, admins get all)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to fetch
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/:orderId", protect, getOrderDetails);

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
