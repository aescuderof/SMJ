const express = require('express');

const {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById
} = require('../controllers/product.controller');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

module.exports = router;
