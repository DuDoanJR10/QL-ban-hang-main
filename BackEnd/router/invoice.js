const express = require('express');
const router = express.Router()
const invoiceController = require('../app/controllers/invoiceController')
const { checkTokenUser, checkTokenAdmin, checkTokenAll } = require('../middlewares/checkToken')

// POST /api/invoice/create
router.post('/create', checkTokenAll, invoiceController.create)

// POST /api/invoice/get-list
router.post('/get-list', checkTokenAdmin, invoiceController.getList)

// POST /api/invoice/remove
router.post('/remove', checkTokenAdmin, invoiceController.remove)

// POST /api/invoice/find
router.post('/find', checkTokenAdmin, invoiceController.find)

// POST /api/invoice/findDate
router.post('/findDate', checkTokenAdmin, invoiceController.findDate)

// POST /api/invoice/findChart
router.post('/findChart', checkTokenAdmin, invoiceController.findChart)

module.exports = router