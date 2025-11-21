const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

// multer ki step 1
const multer = require("multer");

const { createUser, editUser, getAllUsers, deleteUser, signupUser,
     sendemailcontroller, loginUser, getDashboardStats, toggleUserStatus,
     importProduct ,getAllProducts, addCategory,getAllCategories,categoryidDelete ,
     editCategory,updateCategoryStatus ,deleteproductById,editProductById,bestSeller,
    getBestSeller,deletebestsellerById,updatebestsellerStatus,addProductToBestSeller
  ,getAllbestsellerbyid} = require("../../controllers/admincontroller/userController");


     // step 2 hai image  upload on multer 
   const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
  // step 3 hai multer
const upload = multer({ storage });

//step 4 hai
const productImageUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "subImages", maxCount: 5 }
]);

const singleImageUpload = upload.single("image");

router.post("/createusers", authMiddleware, createUser);
router.put("/users/:id", authMiddleware, editUser);
router.get("/getallusers", authMiddleware, getAllUsers);
router.delete("/users/delete/:id", authMiddleware, deleteUser);
router.post("/users/signup", signupUser);
router.post("/send/email", sendemailcontroller);
router.post("/login", loginUser);
router.get("/admin/dashboard/stats", authMiddleware, getDashboardStats);
router.put("/users/:userId/status", authMiddleware, toggleUserStatus);
router.post("/admin/importproduct",authMiddleware,  productImageUpload, importProduct);
router.get("/admin/getallproducts", authMiddleware, getAllProducts);
router.delete("/admin/categoryid/:id", authMiddleware, categoryidDelete);
router.post("/admin/addcategory", authMiddleware, singleImageUpload, addCategory);
router.get("/admin/categories", getAllCategories);
router.patch("/admin/category/status/:id", authMiddleware, updateCategoryStatus);
router.put("/admin/editcategory/:id", authMiddleware, singleImageUpload, editCategory);
router.put("/admin/editproduct/:id", authMiddleware, productImageUpload, editProductById);
router.delete("/admin/deleteproduct/:id", authMiddleware, deleteproductById);

//best seller
router.post("/admin/bestseller", authMiddleware, singleImageUpload, bestSeller);
router.get("/admin/getbestseller", authMiddleware, getBestSeller);
router.delete("/admin/deletebestseller/:id", authMiddleware, deletebestsellerById);
router.patch("/admin/bestseller/status/:id", authMiddleware, updatebestsellerStatus);
router.post("/admin/addproducttobestseller/:id", authMiddleware, productImageUpload , addProductToBestSeller);
router.get("/admin/getallbestsellerproductbyid/:id", authMiddleware, getAllbestsellerbyid);



module.exports = router;
