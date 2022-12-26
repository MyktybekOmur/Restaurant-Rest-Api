const multer = require("multer");
const refund = require("../models/refund.model");
const cook = require("../models/cooked.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const getRefunds = async (req, res) => {
  const refundList = await refund
    .find({})
    .populate({ path: "meals.refund_meal", select: ["name", "price", "image"] })
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
  if (refundList) {
    return new Response(refundList, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const getRefund = async (req, res) => {
  const refundGet = await refund
    .findById(req.params.id)
    .populate({ path: "meal.refund_meal", select: ["name", "price", "image"] });
  //    .populate('meal.cooked_meal')

  if (refundGet) {
    return new Response(refundGet, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const updateRefund = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const refundUpdate = await refund.findByIdAndUpdate(id, body);
  if (refundUpdate) {
    return new Response(refundUpdate, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const deleteRefund = async (req, res) => {
  const { id } = req.params;

  const refundDelete = await refund.findByIdAndDelete(id);
  if (refundDelete) {
    return new Response(null, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const addRefund = async (req, res) => {
  const body = req.body;
  let cookAdded = await cook.find({ date: body?.date });
  let check = false;

  if (cookAdded.length > 0) {
    cookAdded[0].sold_count =
      (await cookAdded[0].sold_count) - body.total_count;

    cookAdded[0].refund_count =
      (await cookAdded[0].refund_count) + body.total_count;
    cookAdded[0].total_price =
      (await cookAdded[0].total_price) - body.total_price;
    for (let i = 0; i < body.meals.length; i++) {
      for (let j = 0; j < cookAdded[0].meal.length; j++) {
        if (
          body.meals[i].refund_meal.toString() ===
          cookAdded[0].meal[j].cooked_meal.toString()
        ) {
          cookAdded[0].meal[j].sold_count =
            (await cookAdded[0].meal[j].sold_count) - body.meals[i].count;

          cookAdded[0].meal[j].refund_count =
            (await cookAdded[0].meal[j].refund_count) + body.meals[i].count;
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
    const refundSave = new refund(req.body);
    await refundSave
      .save()
      .then((data) => {
        return new Response(data, "Kayıt Başarıyla Eklendi").created(res);
      })
      .catch((err) => {
        throw new APIError("Error add !", 400);
      });
  }
};

module.exports = {
  getRefunds,
  addRefund,
  getRefund,
  updateRefund,
  deleteRefund,
};
