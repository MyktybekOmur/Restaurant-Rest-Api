const router = require("express").Router();
const multer = require("multer")

const { getMeals, addMeal,getMeal, updateMeal, updateMealImg, deleteMeal } = require("../controllers/meal.controller")



router.put("/meals/:id", updateMeal)
router.get("/meals/:id", getMeal)
router.delete("/meals/:id", deleteMeal)
router.post("/meals/image/:id", updateMealImg)

router.get("/meals", getMeals)

router.post("/meals", addMeal)




module.exports = router