const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.addProduct);
router.delete('/:id', ProductController.deleteProduct);
router.patch('/:id', ProductController.patchProduct);

module.exports = router;