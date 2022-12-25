const multer = require("multer");
const cook = require("../models/cooked.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");


const getCooks = async (req, res) => {
  const cookList = await cook.find({})
  if (cookList) {
    return new Response(cookList, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const getCook = async (req, res) => {
    console.log()
  const CookGet = await cook.findById(req.params.id)
   .populate({path: 'meal.cooked_meal', select:['name','price','image']})
//    .populate('meal.cooked_meal')

  if (CookGet) {
    return new Response(CookGet, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const updateCook = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const cookUpdate = await cook.findOneAndUpdate(id, body);
  if (cookUpdate) {
    return new Response(cookUpdate, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const deleteCook = async (req, res) => {
  const { id } = req.params;

  const cookDelete = await cook.findByIdAndDelete(id);
  if (cookDelete) {
    return new Response(null, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const addCook = async (req, res) => {
     console.log(req.body)
      const cookSave = new cook(req.body);
      await cookSave
        .save()
        .then((data) => {
          return new Response(data, "Kayıt Başarıyla Eklendi").created(res);
        })
        .catch((err) => {
          throw new APIError("Error add !", 400);
        });
};

module.exports = {
  getCooks,
  addCook,
  getCook,
  updateCook,
  deleteCook,
};
