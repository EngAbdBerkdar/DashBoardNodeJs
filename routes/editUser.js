const express = require("express");
const router = express.Router();
const customer = require("../models/customerSchema");
const userController = require("../controllers/userController")

router.get("/edit/:id", userController.user_edit_get);
router.delete("/edit/:id", userController.user_delete);
router.put("/edit/:id", userController.user_put);

module.exports = router;
