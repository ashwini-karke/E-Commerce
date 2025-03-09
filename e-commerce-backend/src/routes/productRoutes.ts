import express from "express";
import multer from "multer";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

// Configure Multer to store images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products/add:
 *   post:
 *     summary: Add a new product (Admin only)
 *     description: Only admin users can add new products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: [] # Requires JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - category
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               description:
 *                 type: string
 *                 example: "High-performance laptop"
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized, token required
 *       403:
 *         description: Forbidden, only admins can add products
 */
router.post("/add", protect, adminOnly, upload.single("image"), addProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Fetch all products along with their images.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Server error
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product (Admin only)
 *     description: Only admin users can update a product. Image upload is optional.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request, missing required fields
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     description: Remove a product by its ID (Admins only).
 *     tags: [Products]
 *     security:
 *       - bearerAuth: [] # Requires JWT token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized, token required
 *       403:
 *         description: Forbidden, only admins can delete products
 */
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;