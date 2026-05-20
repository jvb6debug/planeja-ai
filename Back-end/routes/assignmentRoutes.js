const express = require("express");
const controller = require("../controllers/assignmentController");

const router = express.Router();

router.post("/assign", controller.assignTask);
router.post("/unassign", controller.unassignTask);
router.get("/user/:user_id", controller.getUserTasks);
router.get("/task/:task_id", controller.getTaskUsers);
router.get("/tasks/", controller.getTotalTasks);

module.exports = router;
