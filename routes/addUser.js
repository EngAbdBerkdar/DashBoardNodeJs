const express = require("express");
const router = express.Router();
const customer = require("../models/customerSchema");
const userController = require("../controllers/userController")

router.get("/add.html", userController.user_add_get);
router.post("/add.html", userController.user_post);
module.exports = router;
