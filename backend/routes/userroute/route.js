const express = require("express");
const router = express.Router();
const auth = require("../../middleware/userauth")

const { getAllProductsForUser,getProductByIdForUser, toggleLike ,getAllProductByCategory} = require("../../controllers/usercontrollers/userAllController")
console.log("USER ROUTES LOADED");

router.get("/products", getAllProductsForUser);

router.get("/products/:id", getProductByIdForUser);
router.post("/products/like/:id", auth, toggleLike);



router.get("/products/category/:id", getAllProductByCategory);

module.exports = router;
