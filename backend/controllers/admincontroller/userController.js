const User = require("../../models/usermodel.js");
const Product = require("../../models/uploadmodel.js");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const transporter = require("../../config/emailsend.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const getBaseUrl = require("../../config/baseurl.js");
const e = require("express");
dotenv.config();

const Category = require("../../models/categorymodel.js");
const BestSeller = require("../../models/bestseller.js");

exports.createUser = async (req, res) => {
  try {
    const { forname, surname, email, password, role } = req.body;

    if (!forname || !surname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields"
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      })
    }



    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }

    if (!role) {
      return res.status(400).json({ message: 'Role is required to create a user.' });
    }


    if (role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "only admin can create user"
      })
    }


    const newUser = await User.create({ forname, surname, email, password, role });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to create user"
    });
  }
};


exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { forname, surname, email } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: " Id is null / undefined"
      })
    }

    if (!email.includes("@") || !email.endsWith("gmail.com")) {
      return res.status(400).json({ message: "Invalid email format. Email must contain '@' and end with '.com'." });
    }



    const updatedUser = await User.findByIdAndUpdate(id, { forname, surname, email }, { new: true });
    updatedUser.password = undefined;
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    })
  } catch (error) {
    console.log(error);
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        Total: users.length,
        message: "No users found"
      })
    }
    users.password = undefined;
    return res.status(200).json({
      success: true,
      Total: users.length,
      message: "Users fetched successfully",
      users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch users"
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: " Id is null / undefined"
      })
    }

    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      Total: deletedUser.length,
      message: "User deleted successfully",
      user: deletedUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to delete user"
    })
  }
}

exports.signupUser = async (req, res) => {
  try {
    const { forname, surname, email, password } = req.body;

    if (!forname || !surname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields"
      });
    }

    const adminEmails = ["admin@gmail.com"];

    if (adminEmails.includes(email)) {
      return res.status(400).json({
        success: false,
        message: "You cannot signup using admin email"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      forname,
      surname,
      email,
      password: hashedPassword,
      role: "user"
    });

    // ⭐ ⭐ TOKEN GENERATE KARO (BIG FIX)
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    newUser.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,         // ⭐ AB token jayega
      user: newUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to signup user"
    });
  }
};




exports.sendemailcontroller = async (req, res) => {
  const { to, subject, message } = req.body;

  // Log the request body for debugging
  console.log('Request body:', req.body);

  try {
    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    // Success response
    res.json({ success: true, message: "Email Sent Successfully" });
  } catch (err) {
    // Log and send failure response
    console.log('Email send failed:', err);
    res.json({ success: false, message: "Failed to send email", error: err });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    // Check if the user is admin by email and password
    const isAdmin = email === adminEmail;
    const isPasswordValid = password === adminPassword;

    // If admin credentials are correct, log in as admin directly
    if (isAdmin && isPasswordValid) {
      const payload = {
        email: adminEmail,
        role: 'admin',  // Admin role directly assigned
      };

      // Generate JWT token for admin
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        user: { email: adminEmail, role: 'admin' },
        token
      });
    }

    // If not admin, continue with regular user authentication
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not logged in "
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);  // Correct password field
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not defined in .env"
      });
    }

    // Generate JWT token for user
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role  // User's role (admin or user) from database
    };

    // JWT token for regular user
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { id: user._id, email: user.email, role: user.role },  // Role will be either 'admin' or 'user'
      token
    });

  } catch (error) {
    console.error(error);  // Error ko log karte hain debugging ke liye
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to login user"
    });
  }
};


// exports.getDashboardStats = async (req, res) => {
//   try {

//     // Get total users count (all users in the database)
//     const totalUsers = await User.countDocuments();

//     // Get total active users (status: 1)
//     const activeUsers = await User.countDocuments({ status: 1 });

//     // Get total inactive users (status: 0)
//     const inactiveUsers = await User.countDocuments({ status: 0 });

//     // Send the response with just the counts
//     return res.status(200).json({
//       success: true,
//       message: 'Dashboard stats fetched successfully',
//       data: {
//         totalUsers,
//         activeUsers,
//         inactiveUsers
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching dashboard stats:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Something went wrong. Please try again later.'
//     });
//   }
// };

exports.getDashboardStats = async (req, res) => {
  try {
    // --- USERS ---
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 1 });
    const inactiveUsers = await User.countDocuments({ status: 0 });

    // --- CATEGORY ---
    const totalCategories = await Category.countDocuments();
    const activeCategories = await Category.countDocuments({ status: true });
    const inactiveCategories = await Category.countDocuments({ status: false });

    // --- BESTSELLER ---
    const totalBestSellers = await BestSeller.countDocuments();
    const activeBestSellers = await BestSeller.countDocuments({ status: true });
    const inactiveBestSellers = await BestSeller.countDocuments({ status: false });

    // --- PRODUCTS (Project) ---
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: true });
    const inactiveProducts = await Product.countDocuments({ status: false });

    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: inactiveUsers
        },
        categories: {
          total: totalCategories,
          active: activeCategories,
          inactive: inactiveCategories
        },
        bestSellers: {
          total: totalBestSellers,
          active: activeBestSellers,
          inactive: inactiveBestSellers
        },
        products: {
          total: totalProducts,
          active: activeProducts,
          inactive: inactiveProducts
        }
      }
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later."
    });
  }
};




exports.toggleUserStatus = async (req, res) => {
  const { userId } = req.params; // Extracting userId from URL
  const { status } = req.body; // New status (0 or 1) from request body

  // Validate status (0 or 1)
  if (status !== 0 && status !== 1) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    // Find the user by ID and update their status
    const user = await User.findByIdAndUpdate(
      userId,
      { status }, // Update the 'status' field
      { new: true } // Return the updated user
    );

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong. Try again!" });
  }
};


exports.importProduct = async (req, res) => {
  try {
    const {
      name,
      title,
      price,
      description,
      fabric,
   
      categoryId,
      bestSellerId,
      colors,
    
    } = req.body;

    const BASE_URL = getBaseUrl(req);

    // ⭐ Main Image
    const mainImage = req.files?.mainImage
      ? `${BASE_URL}/uploads/${req.files.mainImage[0].filename}`
      : null;

    if (!mainImage) {
      return res.status(400).json({ message: "Main image is required!" });
    }

    // ⭐ Sub Images
    const subImages = req.files?.subImages
      ? req.files.subImages.map((file) => `${BASE_URL}/uploads/${file.filename}`)
      : [];

    // ⭐ Create Product
    const product = new Product({
      name,
      title,
      price,
      description,
      fabric,
   
    
      categoryId,
      bestSellerId,
      colors: Array.isArray(colors) ? colors : [colors],
      mainImage,
      subImages,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully!",
      product,
    });

  } catch (error) {
    console.error(" Error uploading product:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
   const products = await Product.find()
  .populate("categoryId", "name");  // <-- ADD THIS

    res.status(200).json({ success: true, message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.categoryidDelete = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category: deletedCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
        const BASE_URL = getBaseUrl(req);
    const image = `${BASE_URL}/${req.file.path}`; 

    const newCategory = await Category.create({ name, image });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category: newCategory
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};







exports.updateCategoryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, message: "Status updated", updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// exports.editCategory = async (req, res) => {
//   try {
//     const { name } = req.body;
//         const BASE_URL = getBaseUrl(req);
//     const image = `${BASE_URL}/${req.file.path}`; 

//     const updated = await Category.findByIdAndUpdate(
//       req.params.id,
//       { name, image },
//       { new: true }
//     );

//     res.json({ success: true, message: "Category updated", updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };  

// exports.editCategory = async (req, res) => {
//   try {
//     const { name, existingImage } = req.body;

//     const BASE_URL = getBaseUrl(req);
//     let imagePath;

//     // ⭐ If NEW image uploaded
//     if (req.file) {
//       imagePath = `${BASE_URL}/${req.file.path.replace(/\\/g, "/")}`;
//     }

//     // ⭐ If NO new image, use existing one
//     else {
//       // If existingImage already full URL → keep as it is
//       if (existingImage.startsWith("http://") || existingImage.startsWith("https://")) {
//         imagePath = existingImage;
//       } 
//       else {
//         // If existingImage is just filename or relative
//         imagePath = `${BASE_URL}/${existingImage}`;
//       }
//     }

//     // ⭐ Update Category
//     await Category.findByIdAndUpdate(
//       req.params.id,
//       { name, image: imagePath },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Category updated successfully",
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.editCategory = async (req, res) => {
  try {
    const { name, existingImage } = req.body;

    const BASE_URL = getBaseUrl(req);
    let imagePath;

    // ⭐ If NEW image uploaded
    if (req.file) {
      imagePath = `${BASE_URL}/${req.file.path.replace(/\\/g, "/")}`;
    }

    // ⭐ If NO new image
    else {
      // ⭐ Safe check — existingImage defined hai?
      if (existingImage && (existingImage.startsWith("http://") || existingImage.startsWith("https://"))) {
        imagePath = existingImage;
      }
      else if (existingImage) {
        // If relative or file name
        imagePath = `${BASE_URL}/${existingImage}`;
      }
      else {
        // ⭐ If nothing supplied → DON’T crash, keep image same
        const oldCategory = await Category.findById(req.params.id);
        imagePath = oldCategory?.image || ""; 
      }
    }

    // ⭐ Update Category
    await Category.findByIdAndUpdate(
      req.params.id,
      { name, image: imagePath },
      { new: true }
    );

    res.json({
      success: true,
      message: "Category updated successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





exports.deleteproductById = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.editProductById = async (req, res) => {
  try {
    const { name, title, price, colors, description, fabric } = req.body;
    const productId = req.params.id;  // ✅ yaha req hoga, res nahi

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const BASE_URL = getBaseUrl(req);

    // ---------- NORMAL FIELDS UPDATE ----------
    if (name !== undefined) product.name = name;
    if (title !== undefined) product.title = title;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (fabric !== undefined) product.fabric = fabric;



    // ---------- COLORS HANDLE (string ya array dono) ----------
    if (colors !== undefined) {
      let finalColors = colors;

      // agar frontend se comma-separated string aayi ho: "Red, Blue, Black"
      if (typeof colors === "string") {
        finalColors = colors
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);
      }

      product.colors = finalColors;
    }

    // ---------- MAIN IMAGE UPDATE (optional) ----------
    if (req.files?.mainImage && req.files.mainImage[0]) {
      const mainImgPath = `${BASE_URL}/uploads/${req.files.mainImage[0].filename}`;
      product.mainImage = mainImgPath;
    }

    // ---------- SUB IMAGES UPDATE (append) ----------
    if (req.files?.subImages && req.files.subImages.length > 0) {
      const newSubImages = req.files.subImages.map(
        (file) => `${BASE_URL}/uploads/${file.filename}`
      );

      // OPTION 1: Append old + new
      product.subImages = [...product.subImages, ...newSubImages];

      // OPTION 2 (agar purana sab replace karna ho):
      // product.subImages = newSubImages;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Edit product error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.bestSeller = async (req,res) => {
  try {
    const {name} = req.body;
        const BASE_URL = getBaseUrl(req);
     const image = `${BASE_URL}/${req.file.path}`; 

     const newBestSeller = await BestSeller.create({name, image});
     res.status(200).json({success: true, message: "Bestseller added", newBestSeller});

  } catch(error) {
    res.status(500).json({success: false, message: error.message});
  }
}


exports.getBestSeller = async (req,res) => {
  try{
  const bestSellers = await BestSeller.find();
  res.status(200).json({
    success: true, 
    message: "Bestsellers fetched successfully", 
    bestSellers: bestSellers,
    count: bestSellers.length
  });
  } catch(error){
    res.status(500).json({success: false, message: error.message});
  }
}

exports.deletebestsellerById = async(req,res)=>{
  try {
    const bestsellerId = req.params.id;
    await BestSeller.findByIdAndDelete(bestsellerId);
    res.status(200).json({ success: true, message: "Bestseller deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.updatebestsellerStatus = async (req,res) =>{
  try {
    const { status } = req.body;

    const updated = await BestSeller.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Bestseller status updated successfully",updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const path = require("path");
const fs = require("fs");

exports.editBestSeller = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, existingImage } = req.body;

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    const item = await BestSeller.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // Update name
    if (name) item.name = name;

    // New image upload case
    if (req.file) {
      // OLD FILE DELETE (if stored locally)
      if (item.image) {
        const oldFileName = item.image.replace(BASE_URL, "").trim();
        const oldPath = path.join(__dirname, "..", oldFileName);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // SET NEW IMAGE WITH BASE_URL
      item.image = `${BASE_URL}/uploads/${req.file.filename}`;
    } else {
      // NO NEW FILE → keep existing image from body
      if (existingImage) item.image = existingImage;
    }

    await item.save();

    res.json({ success: true, message: "BestSeller updated!", bestSeller: item });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};




exports.addProductToBestSeller = async (req, res) => {
  try {
    const { id } = req.params;   // BestSeller ID
    const { name, title, price, description, sizes,  colors } = req.body;

    // 1) Check if bestSeller exists
    const exists = await BestSeller.findById(id);
    if (!exists) {
      return res.json({ success: false, message: "BestSeller not found" });
    }

    // 2) Image
    const BASE_URL = getBaseUrl(req);
    
const mainImage = req.files?.mainImage
  ? `${BASE_URL}/uploads/${req.files.mainImage[0].filename}`
  : null;

const subImages = req.files?.subImages
  ? req.files.subImages.map((file) => `${BASE_URL}/uploads/${file.filename}`)
  : [];

    // 3) Create product
    const product = await Product.create({
      name,
      price,
      description,
      title,
      mainImage,
      subImages,
      sizes,
      colors,
      mainImage,
      subImages,
      bestSeller: id,               // mark as bestSeller product
    });

    return res.json({
      success: true,
      message: "Product added under BestSeller",
      product,
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};



exports.getallbestcellerproductbyid = async (req, res) => {
  try {
    const products = await Product.find({ bestSeller: req.params.id });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}