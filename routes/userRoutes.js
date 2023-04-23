const { Router } = require("express");
const controller = require("../controllers/user-controller");

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
