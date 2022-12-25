const router = require("express").Router();
const { addCook, getCook, updateCook, getCooks, deleteCook } = require("../controllers/cooked.controller");


router.put("/cooked/:id", updateCook);
router.get("/cooked/:id", getCook);
router.delete("/cooked/:id", deleteCook);
router.get("/cooked", getCooks);
router.post("/cooked", addCook);

module.exports = router;