const router = require("express").Router();
const {
  addOrder,
  getOrders,
  cencelOrder,
  getOrder,
  updateOrder,
} = require("../controllers/orders.controller");

router.put("/orders/:id", updateOrder);
router.get("/orders/:id", getOrder);
router.delete("/orders/:id", cencelOrder);

router.get("/orders", getOrders);

router.post("/orders", addOrder);

module.exports = router;
