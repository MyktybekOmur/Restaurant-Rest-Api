const multer = require("multer");
const cost = require("../models/cost.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");


const getCosts = async (req, res) => {
  const costsList = await cost.find({});
  if (costsList) {
    return new Response(costsList, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const getCost = async (req, res) => {
  const CostGet = await cost.findById(req.params.id);
  if (CostGet) {
    return new Response(CostGet, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const updateCost = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const costUpdate = await cost.findOneAndUpdate(id, body);
  if (costUpdate) {
    return new Response(costUpdate, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const deleteCost = async (req, res) => {
  const { id } = req.params;

  const costDelete = await cost.findByIdAndDelete(id);
  if (costDelete) {
    return new Response(null, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const addCost = async (req, res) => {
     console.log(req.body)
      const costSave = new cost(req.body);
      await costSave
        .save()
        .then((data) => {
          return new Response(data, "Kayıt Başarıyla Eklendi").created(res);
        })
        .catch((err) => {
          throw new APIError("Error add !", 400);
        });
};

module.exports = {
  getCosts,
  addCost,
  getCost,
  updateCost,
  deleteCost,
};
