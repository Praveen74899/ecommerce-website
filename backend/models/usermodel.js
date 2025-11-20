const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    forname: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
      
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
     status: { type: Number, default: 0 },
     
});

module.exports = mongoose.model("User", userSchema);