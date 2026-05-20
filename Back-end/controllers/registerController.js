const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require("../models/userModel");

dotenv.config({ path: '../dotenv.env' });

exports.register = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Save user
  const result = User.create({
    name: name,
    email: email,
    password_hash: hashedPassword,
    status: "Active"
  });

  // Auto-login after register
  const accessToken = jwt.sign(
    { id: result.lastInsertRowid, name: name },
    process.env.SECRET_ACCESS_TOKEN,
    { expiresIn: '1h' }
  );

  return res.status(201).json({
    message: "User created",
    accessToken
  });
};
