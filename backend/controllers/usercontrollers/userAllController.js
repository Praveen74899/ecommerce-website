const products = require("../../models/uploadmodel.js")
  const BestSeller = require("../../models/bestseller.js");
  
exports.getAllProductsForUser = async (req, res) => {
  try {
      console.log("Controller hit");
    const product = await products.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};



exports.getProductByIdForUser = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Fetching product with ID:", productId);
    const product = await products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};




exports.toggleLike = async (req, res) => {
  try {
    console.log("LIKE ROUTE HIT");

     const userId = req.user.id;   
    console.log("ID HIA ",userId);   // JWT se user
    const productId = req.params.id;
      console.log(productId); // Product ID from URL
    const product = await products.findById(productId);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    let liked = false;

    // Already liked? → Remove like
    if (product.likedBy.includes(userId)) {
      product.likedBy = product.likedBy.filter(id => id.toString() !== userId);
      liked = false;
    } 
    else {
      // Not liked → Add like
      product.likedBy.push(userId);
      liked = true;
    }

    await product.save();

    res.json({
      success: true,
      liked, 
      totalLikes: product.likedBy.length,
       likedBy: product.likedBy

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




exports.getAllProductByCategory = async (req, res) => {
  try {
    const product = await products.find({
      categoryId: req.params.id  // MongoDB automatically ObjectId me convert kar lega
    });

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};






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



exports.getAllbestsellerbyid = async (req, res) => {
  try {
    const bestSellerId = req.params.id;
    const product = await products.find({ bestSeller: bestSellerId });
    res.status(200).json({ success: true, message: "BestSeller products fetched successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllNewArrival = async (req,res) => {
  try{
  const newArrival = await products.find().sort({ createdAt: -1 }).limit(10);
  res.status(200).json({
    success: true, 
    message: "NewArrival fetched successfully", 
    newArrival: newArrival,
    count: newArrival.length
  });
  } catch(error){
    res.status(500).json({success: false, message: error.message});
  }
}


exports.getSearchProduct = async (req, res) => {
  try {
    const { key } = req.params;
    const product = await products.find({ $text: { $search: key } });
    res.status(200).json({ success: true, message: "Search product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};