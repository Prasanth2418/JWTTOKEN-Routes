const userInfo = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register
//@route post  /users/register
//@acces public

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("Madatory to fill all details");
    }
    const existuser = await userInfo.findOne({ email });
    if (existuser) {
      return res.status(400).send("User already registerd");
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await new userInfo({
      username,
      email,
      password: hashedpassword,
    });
    await newUser.save();
    return res.status(200).send("User registered successfully");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//@desc Login
//@route post  /users/login
//@acces public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await userInfo.findOne({ email });
    if (!exist) {
      return res.status(400).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, exist.password);
    if (!isPasswordValid) {
      return res.status(400).send("Password incorrect");
    }
    const accessToken = jwt.sign(
      {
        user: {
          id: exist.id,
          username: exist.username,
          email: exist.email,
        },
      },
      process.env.JWTPASSWORD,
      {
        expiresIn: 3600000,
      }
    );
    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//@desc current user
//@route get  /users/current
//@acces private

const currentUser = async (req, res) => {
  return res.json(req.user);
};

module.exports = { registerUser, loginUser, currentUser };
