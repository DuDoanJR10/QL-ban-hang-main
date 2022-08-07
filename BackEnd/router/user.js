const express = require('express');
const router = express.Router()
const userController = require('../app/controllers/userController');
const { checkTokenAdmin } = require('../middlewares/checkToken')

// POST /api/user/register
router.post('/register', checkTokenAdmin, userController.register)

// POST /api/user/login
router.post('/login', userController.login)

// POST /api/user/getList
router.post('/getList', checkTokenAdmin, userController.getList)

// POST /api/user/update
router.post('/update', checkTokenAdmin, userController.updateUser)

// POST /api/user/remove
router.post('/remove', checkTokenAdmin, userController.removeUser)

// POST /api/user/find
router.post('/find', checkTokenAdmin, userController.findUser)

module.exports = router