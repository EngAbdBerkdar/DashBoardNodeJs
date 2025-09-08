const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

router.get("/",userController.user_index_get);
router.get("/view/:id",userController.user_view_get);
router.post("/search", userController.user_search_post);

module.exports = router;

// router.post("/search", (req, res) => {
//   customer
//     .find({ age: { $gt: 20 } })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });