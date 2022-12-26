const mongoose = require("mongoose")


const mealsShema = new mongoose.Schema({
    total_count:{
        type: Number,
        default:0
    },
    sold_count:{
        type: Number,
        default:0
    },
    balance_count:{
        type: Number,
        default:0
    },
    refund_count:{
        type: Number,
        default:0
    },
    cooked_meal:{ type: mongoose.Schema.ObjectId,
    ref:'meals',
    }
})
const meals= mongoose.model('cooked_meal',mealsShema).schema

const cookShema = new mongoose.Schema({
    total_count: {
        type: Number,
        default:0
    },
    total_price: {
        type: Number,
        default:0
    },
    total_cost: {
        type: Number,
        default:0
    },
    sold_count:{
        type: Number,
        default:0
    },
    balance_count:{
        type: Number,
        default:0
    },
    refund_count:{
        type: Number,
        default:0
    },
    meal:[meals],
    date:{
        type:Date,
        required: true
    }

},{collection: "cooked", timestamps: true})

const cook = mongoose.model("cooked", cookShema)

module.exports = cook