import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controller/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getAllProducts).post(protect, isAdmin, createProduct);
router.route('/top').get(getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
