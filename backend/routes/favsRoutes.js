const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();

//Route to get all fav data
// GET /favs/all
router.get("/all", userController.getAllUsersFavs)


module.exports = router;