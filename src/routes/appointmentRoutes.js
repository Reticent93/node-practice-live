const { Router } = require("express");
const controller = require("../controllers/appointment-controller");


const router = Router();

router.post("/", controller.createAppointment);
router.get("/", controller.getAppointments);
router.put("/:id", controller.updateAppointment);
router.delete("/:id", controller.deleteAppointment);

module.exports = router;