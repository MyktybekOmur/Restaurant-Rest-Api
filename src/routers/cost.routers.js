const { updateCost, getCost, deleteCost, getCosts, addCost } = require("../controllers/cost.controller");
const router = require("express").Router();




router.put("/costs/:id", updateCost)
router.get("/costs/:id", getCost)
router.delete("/costs/:id", deleteCost)
router.get("/costs", getCosts)
router.post("/costs", addCost)




module.exports = router