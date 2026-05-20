const express = require("express");
const controller = require("../controllers/teamMemberController");

const router = express.Router();

router.post("/add", controller.addMember);
router.post("/remove", controller.removeMember);
router.get("/:team_id", controller.getTeamMembers);

module.exports = router;
