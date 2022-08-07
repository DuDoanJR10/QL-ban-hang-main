const express = require('express');
const router = express.Router()
const goodController = require('../app/controllers/goodController');
const { checkTokenUser, checkTokenAdmin } = require('../middlewares/checkToken')
const { upload } = require('../helpers/filehelper')

// POST /api/good/add
router.post('/add', checkTokenAdmin, goodController.add)

// POST /api/good/get-list
router.post('/get-list', goodController.getList)

// POST /api/good/update
router.post('/update', checkTokenAdmin, goodController.update)

// POST /api/good/update-priceSell
router.post('/update-priceSell', checkTokenAdmin, goodController.updatePriceSell)

// POST /api/good/remove
router.post('/remove', checkTokenAdmin, goodController.remove)

// POST /api/good/uploadIMG
router.post('/uploadIMG', upload.single('file'), goodController.uploadImg)

// POST /api/good/find
router.post('/find', checkTokenAdmin, goodController.find)

module.exports = router