const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require("../models/userModel");

dotenv.config({ path: '../dotenv.env' });

exports.login = async (req, res,  next) => {
  const { name, password } = req.body;

  // Find user
  const user = User.getByUsername({name});

  // console.log("user: ", user);
  // console.log("hash:", user?.password_hash);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare password
  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create JWT token
  const accessToken = jwt.sign(
    { id: user.id, name: user.name },
    process.env.SECRET_ACCESS_TOKEN,
    { expiresIn: '1d' }
  );

  res.json({ accessToken });
};
