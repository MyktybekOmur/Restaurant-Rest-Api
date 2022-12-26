const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index:true,
        sparse:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    storeName:{
        type: String,
        required: true,
        trim: true
    },
    storeAdress:{
        type: String,
        required: true,
        trim: true
    },
    number:{
        type: String,
        required: true,
        trim: true
    },

    role:{
        type: String,
        default:null
    },
    image:{
        type: String,
        default:null
    }
},{collection: "users", timestamps: true})

const user = mongoose.model("users", userShema)

module.exports = user