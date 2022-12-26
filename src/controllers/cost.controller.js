const multer = require("multer");
const cost = require("../models/cost.model");
const meal = require("../models/meal.model");
const cook = require("../models/cooked.model");
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
      const cookAdded = await cook.find({date:req.body.date})
      let check = false;
      if(cookAdded.length>0){
        console.log(cookAdded)
        const cookUpdate = await cook.findByIdAndUpdate(cookAdded[0]._id,  { $inc: { total_cost: req.body.total_price } });
        if (cookUpdate) {
           check = true;
          } else {
            throw new APIError("Not Found", 400);
          }
      }else{
       check= addDefaultCook(req,res)
      }
      if(check){
        const costSave = new cost(req.body);
        await costSave
          .save()
          .then((data) => {
            return new Response(data, "Kayıt Başarıyla Eklendi").created(res);
          })
          .catch((err) => {
            throw new APIError("Error add !", 400);
          });
      }

};

const addDefaultCook = async (req,res)=>{
     const mealsList = await meal.find({}).limit(1);
        if (mealsList) {
          const body = {
            total_cost: req.body.total_price,
            date:req.body.date,
            meal:[{
              cooked_meal:mealsList[0].id
            }]
          }
          const cookSave = new cook(body);
          await cookSave
            .save()
            .then((data) => {
              return true
            })
            .catch((err) => {
              return false;
            });
   
        } else {
          return false;
        }
}

module.exports = {
  getCosts,
  addCost,
  getCost,
  updateCost,
  deleteCost,
};
