const { Router } = require("express");
const controller = require("../controllers/user-controller");


const router = Router();

router.post("/", controller.createUser);
router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.post("/login", controller.userLogin);

module.exports = router;
