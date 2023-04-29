const { Router } = require("express");
const controller = require("../controllers/medication-controller");


const router = Router();

router.post("/", controller.createMedication);
router.get("/", controller.getMedications);
router.put("/:id", controller.updateMedication);
router.delete("/:id", controller.deleteMedication);

module.exports = router;