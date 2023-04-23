const { Router } = require("express");
const controller = require("../controllers/provider-controller");

const router = Router();

router.get("/", controller.getProviders);
router.get('/:id', controller.getProviderById)

module.exports = router;
