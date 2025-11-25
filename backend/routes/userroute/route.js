const express = require("express");
const router = express.Router();
const auth = require("../../middleware/userauth")

const { getAllProductsForUser,getProductByIdForUser, toggleLike ,getAllProductByCategory,
    getBestSeller,getAllNewArrival,getAllbestsellerbyid,getSearchProduct,getAllCategories,
getUserLikedProducts} = require("../../controllers/usercontrollers/userAllController")
console.log("USER ROUTES LOADED");

router.get("/products", getAllProductsForUser);

router.get("/products/:id", getProductByIdForUser);
router.post("/products/like/:id", auth, toggleLike);


router.get("/categories", getAllCategories);
router.get("/products/category/:id", getAllProductByCategory);

router.get("/getbestseller",getBestSeller);
router.get("/getallbestsellerproductbyid/:id", getAllbestsellerbyid);

router.get("/getallnewarrival",getAllNewArrival);

router.get("/searchproduct/:key", getSearchProduct);
router.get("/getlikeproduct/:id",auth, getUserLikedProducts);
module.exports = router;
