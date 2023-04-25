const { Router } = require("express");
const controller = require("../controllers/provider-controller");

const router = Router();

router.get("/", controller.getProviders);
router.post("/", controller.createProvider);
router.get("/:id", controller.getProviderById);
router.put("/:id", controller.updateProvider);
router.delete("/:id", controller.deletProvider);

module.exports = router;
