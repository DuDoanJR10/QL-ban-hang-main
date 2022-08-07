const express = require("express");
const router = express.Router();
const gustController = require("../app/controllers/gustController");
const { checkTokenAdmin, checkTokenAll } = require("../middlewares/checkToken");

// POST /api/gust/create
router.post("/create", checkTokenAll, gustController.create);

// POST /api/gust/get-list
router.post("/get-list", checkTokenAdmin, gustController.getList);

// POST /api/gust/update
router.post("/update", checkTokenAll, gustController.update);

// POST /api/gust/remove
router.post("/remove", checkTokenAdmin, gustController.remove);

// POST /api/gust/find
router.post("/find", checkTokenAll, gustController.find);

// POST /api/gust/findOne
router.post("/findOne", checkTokenAll, gustController.findOne);

module.exports = router;
