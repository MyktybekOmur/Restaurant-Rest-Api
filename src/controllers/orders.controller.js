
const order = require("../models/order.model");
const user = require("../models/user.model")
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const getOrders= async (req, res) => {
    
  const ordersList = await order.find({}).populate({path: 'meals.ordered_meal', select:['name','price','image']}).populate({path: 'storeId',select:['name','email','number',,'storeName','storeAdress','image']});
  if (ordersList) {
    return new Response(ordersList, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const getOrder = async (req, res) => {
  const getOrder = await order.findById(req.params.id).populate({path: 'meals.ordered_meal', select:['name','price','image']}).populate({path: 'storeId',select:['name','email','number',,'storeName','storeAdress','image']});
  if (getOrder) {
    return new Response(getOrder, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const orderUpdate = await order.findOneAndUpdate(id, body);
  if (orderUpdate) {
    return new Response(orderUpdate, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const cencelOrder = async (req, res) => {
  const { id } = req.params;
  const orderCenceled = await order.findOneAndUpdate(id,{cenceled:true});
  if (orderCenceled) {
    return new Response(null, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const addOrder = async (req, res) => {
      // const {storeId} = req.body;
      // console.log(req.body)
      // const sendUser = await user.findById({_id:storeId}).select('name storeName storeAdress number image')
   
      const orderSave = new order(req.body);

      await orderSave
        .save()
        .then((data) => {
          return new Response(data, "Kayıt Başarıyla Eklendi").created(res);
        })
        .catch((err) => {
          throw new APIError(`Error add ! ${err}`, 400);
        });
};

module.exports = {
  getOrders,
  addOrder,
  getOrder,
  updateOrder,
  cencelOrder,
};
