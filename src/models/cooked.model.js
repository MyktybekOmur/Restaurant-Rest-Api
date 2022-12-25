const mongoose = require("mongoose")


const mealsShema = new mongoose.Schema({
    count:{
        type: Number,
        required: true,
    },
    cooked_meal:{ type: mongoose.Schema.ObjectId,
    ref:'meals'
    }
})
const meals= mongoose.model('cooked_meal',mealsShema).schema

const cookShema = new mongoose.Schema({
    total_count: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    meal:[meals],
    date:{
        type:Date,
        required: true
    }

},{collection: "cooked", timestamps: true})

const cook = mongoose.model("cooked", cookShema)

module.exports = cook