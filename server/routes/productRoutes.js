import express from "express";
import protect from '../middleware/authMiddleware.js'
import admin from '../middleware/adminMiddleware.js'
import {getProduct, getProductById,getProductByCategory , createProduct , updateProduct, deleteProduct } from '../controller/productController.js'
import multer from "multer";
const upload = multer({dest: 'uploads/' })


const router = express.Router();

// all product
router.route("/").get(getProduct).post(protect, admin, upload.single('image'), createProduct);

// give products from category
router.route('/category').get(getProductByCategory);

// Specific Product
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);


export default router;

