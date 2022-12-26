const multer = require("multer");
const meal = require("../models/meal.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const uploadMealImg = require("../middlewares/lib/upload");
const fs = require("fs");

const getMeals = async (req, res) => {
  const mealsList = await meal.find({});
  if (mealsList) {
    return new Response(mealsList, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const getMeal = async (req, res) => {
  console.log(req.params.id);
  const getMeal = await meal.findById(req.params.id);
  if (getMeal) {
    return new Response(getMeal, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const updateMeal = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const mealUpdate = await meal.findByIdAndUpdate(id, body);
  if (mealUpdate) {
    return new Response(mealUpdate, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};
const updateMealImg = async (req, res) => {
  uploadMealImg(req, res, async function (err) {
    console.log(req.file);
    console.log(req.params);
    const { id } = req.params;

    const mealDelete = await meal.findById(id);
    console.log(fs.existsSync(mealDelete.image.path) && fs.lstatSync(mealDelete.image.path).isDirectory())
    if(fs.existsSync(mealDelete.image.path) && fs.lstatSync(mealDelete.image.path).isDirectory())
    fs.unlinkSync(mealDelete.image.path);
    if (err instanceof multer.MulterError)
      throw new APIError(
        "Resim Yüklenirken Multer Kaynaklı Hata Çıktı : ",
        err
      );
    else if (err) throw new APIError("Resim Yüklenirken Hata Çıktı : ", err);
    else {
      const mealSave = await meal.findByIdAndUpdate(id,{ image: req.file });

      if (mealSave) {
        return new Response(mealSave, "Kayıt Başarıyla Eklendi").created(res);
      } else throw new APIError("Error add !", 400);
    }
  });
};
const deleteMeal = async (req, res) => {
  const { id } = req.params;

  const mealDelete = await meal.findByIdAndDelete(id);
  if (mealDelete) {
    return new Response(null, "Success get").created(res);
  } else {
    throw new APIError("Not Found", 400);
  }
};

const addMeal = async (req, res) => {
  uploadMealImg(req, res, async function (err) {
    if (err instanceof multer.MulterError)
      throw new APIError(
        "Resim Yüklenirken Multer Kaynaklı Hata Çıktı : ",
        err
      );
    else if (err) throw new APIError("Resim Yüklenirken Hata Çıktı : ", err);
    else {
      const mealSave = new meal({ ...req.body, image: req.file });

      await mealSave
        .save()
        .then((data) => {
          return new Response(data, "Kayıt Başarıyla Eklendi").created(res);
        })
        .catch((err) => {
          throw new APIError("Error add !", 400);
        });
    }
  });
};

module.exports = {
  getMeals,
  addMeal,
  getMeal,
  updateMeal,
  updateMealImg,
  deleteMeal,
};
