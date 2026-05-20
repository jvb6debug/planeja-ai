const express = require("express");
const loginController = require('../controllers/loginController');
const AuthMiddleware = require('../middleware/auth');

const router = express.Router();

router.post("/", AuthMiddleware.authenticateToken, loginController.login);

module.exports = router;
