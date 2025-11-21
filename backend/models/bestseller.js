const mongoose = require("mongoose");

const bestSellerSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
        },
        image: {
                type: String,
                required: false,
        },
        status: {
    type: Boolean,
    default: true,   // true = Active, false = Hidden
}
})

module.exports = mongoose.model("BestSeller", bestSellerSchema);