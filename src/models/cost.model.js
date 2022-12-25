const mongoose = require("mongoose")


const costShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    total_price: {
        type: Number,
        required: true
    },
    category:{
        type:String,
        default:'other'
    },
    date:{
        type:Date,
        required: true
    }

},{collection: "costs", timestamps: true})

const cost = mongoose.model("costs", costShema)

module.exports = cost