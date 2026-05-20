const express = require("express");
const controller = require("../controllers/dashboardController");

const router = express.Router();

router.get("/global", controller.globalStats);
router.get("/user/:user_id", controller.userStats);
router.get("/team/:team_id", controller.teamStats);

module.exports = router;
