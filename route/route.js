const express = require("express")
const router = express.Router()

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getallProducts,
  getProductById
} = require("../controller/productcontroller")

const { uploads } = require("../multer/multer")


/**
 * @swagger
 * /api/createProduct:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with image upload (1–3 images)
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: [men, women, kids, decor]
 *               images:               # ✅ properly aligned
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product created successfully
 */
router.post("/createProduct",uploads.array('image',3), createProduct)



/**
 * @swagger
 * /api/updateProduct/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/updateProduct/:id", updateProduct)



/**
 * @swagger
 * /api/deleteProduct/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/deleteProduct/:id", deleteProduct)



/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get("/products", getallProducts)



/**
 * @swagger
 * /api/products/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Product category
 *         schema:
 *           type: string
 *           enum: [men, women, kids, decor]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
router.get("/products/:category", getProductsByCategory)
/**
 * @swagger
 * /api/getById/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/getById/:id", getProductById)


/**
 * @swagger
 * /api/getAllMenImg/{id}
 */
module.exports = router