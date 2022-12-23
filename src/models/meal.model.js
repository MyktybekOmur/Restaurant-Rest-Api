const mongoose = require("mongoose")

const mealShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
       
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: Object,
        default:null
    },
    status:{
        type:Boolean,
        default:false
    }
},{collection: "meals", timestamps: true})

const meal = mongoose.model("meals", mealShema)

module.exports = meal