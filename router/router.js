const express = require('express')
const router = express.Router();

const controller = require('../controllers/controller.js')

router.get('/', controller.getCategories)
router.get('/:category', controller.getRelatedProducts)

module.exports = router;