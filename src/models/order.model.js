const mongoose = require("mongoose")
const meal = require("./meal.model")


// const userShema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     storeName:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     storeAdress:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     number:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     image:{
//         type: String,
//         default:null
//     }
// })

// const user = mongoose.model("order_user", userShema).schema

const mealsShema = new mongoose.Schema({
    count:{
        type: Number,
        required: true,
     
    },
    ordered_meal:{ type: mongoose.Schema.ObjectId,
        ref:'meals'
        }
})
const meals= mongoose.model('ordered_meal',mealsShema).schema

const orderShema = new mongoose.Schema({
    total_count: {
        type: Number,
        required: true,
     
    },
    total_price: {
        type: Number,
        required: true,
       
    },
    storeId:
        { type: mongoose.Schema.ObjectId,
            ref:'users'
            }
    ,
    meals:[meals],
    order_date:{
        type:Date,
        required:true
    },
    complated:{
        type:Boolean,
        default:false
    },
    cenceled:{
        type:Boolean,
        default:false
    }
},{collection: "orders", timestamps: true})

const order = mongoose.model("orders", orderShema)

module.exports = order