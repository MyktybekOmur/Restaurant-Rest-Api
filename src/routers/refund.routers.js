const router = require("express").Router();
const { updateRefund, getRefund, deleteRefund, getRefunds, addRefund } = require("../controllers/refund.controller");


router.put("/refund/:id", updateRefund);
router.get("/refund/:id", getRefund);
router.delete("/refund/:id", deleteRefund);
router.get("/refund", getRefunds);
router.post("/refund", addRefund);

module.exports = router;