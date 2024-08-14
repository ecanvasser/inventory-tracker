const express = require('express')
const router = express.Router();

const controller = require('../controllers/controller.js')

router.get('/', controller.getCategories)
router.get('/:category')

module.exports = router;