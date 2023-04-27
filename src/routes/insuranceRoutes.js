const { Router } = require("express");
const controller = require("../controllers/insurance-controller");


const router = Router();

router.post("/", controller.createInsurance);
router.get("/", controller.getInsurances);
router.put("/:id", controller.updateInsurance);
router.delete("/:id", controller.deleteInsurance);

module.exports = router;