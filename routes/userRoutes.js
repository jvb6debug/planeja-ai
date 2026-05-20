const express = require("express");
const controller = require("../controllers/userController");

const router = express.Router();

router.post("/", controller.createUser);
router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
// router.get("/:name", controller.getUserByName);

module.exports = router;
