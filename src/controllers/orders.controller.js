const order = require("../models/order.model");
const cook = require("../models/cooked.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const getOrders = async (req, res) => {
  const {
    complated = false,
    cenceled = false,
    order_date = null,
    storeId = null,
  } = req.query;

  let query = { complated: complated, cenceled: cenceled };
  if (order_date !== null) query.order_date = order_date;
  if (storeId !== null) query.storeId = storeId;
  const ordersList = await order
    .find(query)
    .populate({
      path: "meals.ordered_meal",
      select: ["name", "price", "image"],
    })
    .populate({
      path: "storeId",
      select: [
        "name",
        "email",
        "number",
        ,
        "storeName",
        "storeAdress",
        "image",
      ],
    });
  if (ordersList) {
    return new Response(ordersList, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const getOrder = async (req, res) => {
  const getOrder = await order
    .findById(req.params.id)
    .populate({
      path: "meals.ordered_meal",
      select: ["name", "price", "image"],
    })
    .populate({
      path: "storeId",
      select: [
        "name",
        "email",
        "number",
        ,
        "storeName",
        "storeAdress",
        "image",
      ],
    });
  if (getOrder) {
    return new Response(getOrder, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  let getOrder = await order.findById(id);
  let cookAdded = await cook.find({ date: getOrder?.order_date });
  let check = false;
  if (cookAdded.length > 0) {
    cookAdded[0].sold_count = await (cookAdded[0].sold_count +
      getOrder.total_count);
    cookAdded[0].balance_count = await (cookAdded[0].balance_count -
      getOrder.total_count);
    cookAdded[0].total_price = await (cookAdded[0].total_price +
      getOrder.total_price);
    for (let i = 0; i < getOrder.meals.length; i++) {
      for (let j = 0; j < cookAdded[0].meal.length; j++) {
        if (
          getOrder.meals[i].ordered_meal.toString() ===
          cookAdded[0].meal[j].cooked_meal.toString()
        ) {
          cookAdded[0].meal[j].sold_count = await (cookAdded[0].meal[j]
            .sold_count + getOrder.meals[i].count);
          cookAdded[0].meal[j].balance_count = await (cookAdded[0].meal[j]
            .balance_count - getOrder.meals[i].count);
        }
      }
    }

    const cookUpdate = await cook.findByIdAndUpdate(
      cookAdded[0]._id,
      cookAdded[0]
    );
    if (cookUpdate) {
      check = true;
    } else {
      throw new APIError("Not Found", 400);
    }
  }
  if (check) {
    const orderUpdate = await order.findByIdAndUpdate(id, body);
    if (orderUpdate) {
      return new Response(orderUpdate, "Success get").created(res);
    } else {
      throw new APIError("Not Found", 400);
    }
  }
};

const cencelOrder = async (req, res) => {
  const { id } = req.params;
  const orderCenceled = await order.findOneAndUpdate(id, { cenceled: true });
  if (orderCenceled) {
    return new Response(null, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const addOrder = async (req, res) => {
  // const {storeId} = req.body;
  const body = req.body;
  console.log(body.complated);
  let check = false;
  if (body.complated) {
    let cookAdded = await cook.find({ date: body?.order_date });

    if (cookAdded.length > 0) {
      cookAdded[0].sold_count = await (cookAdded[0].sold_count +
        body.total_count);
      cookAdded[0].balance_count = await (cookAdded[0].balance_count -
        body.total_count);
      cookAdded[0].total_price = await (cookAdded[0].total_price +
        body.total_price);
      for (let i = 0; i < body.meals.length; i++) {
        for (let j = 0; j < cookAdded[0].meal.length; j++) {
          if (
            body.meals[i].ordered_meal.toString() ===
            cookAdded[0].meal[j].cooked_meal.toString()
          ) {
            cookAdded[0].meal[j].sold_count = await (cookAdded[0].meal[j]
              .sold_count + body.meals[i].count);
            cookAdded[0].meal[j].balance_count = await (cookAdded[0].meal[j]
              .balance_count - body.meals[i].count);
          }
        }
      }

      const cookUpdate = await cook.findByIdAndUpdate(
        cookAdded[0]._id,
        cookAdded[0]
      );
      if (cookUpdate) {
        check = true;
      } else {
        throw new APIError("Not Found", 400);
      }
    }
  }
  if (check || !body.complated) {
    const orderSave = new order(req.body);
    await orderSave
      .save()
      .then((data) => {
        return new Response(data, "Kayıt Başarıyla Eklendi").created(res);
      })
      .catch((err) => {
        throw new APIError(`Error add ! ${err}`, 400);
      });
  }
};

module.exports = {
  getOrders,
  addOrder,
  getOrder,
  updateOrder,
  cencelOrder,
};
