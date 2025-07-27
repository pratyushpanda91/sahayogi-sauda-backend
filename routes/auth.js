const express_auth = require("express");
const router_auth = express_auth.Router();
const bcrypt_auth = require("bcryptjs");
const jwt_auth_route = require("jsonwebtoken");
const User_auth = require("../models/User");

// @route   POST api/auth/register
// @desc    Register a new user (vendor or supplier)
// @access  Public
router_auth.post("/register", async (req, res) => {
  const { name, phone, password, role, marketArea } = req.body;

  try {
    let user = await User_auth.findOne({ phone });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this phone number already exists" });
    }

    // *** FIX: Normalize the marketArea to ensure consistency ***
    const normalizedMarketArea = marketArea.trim().toLowerCase();

    user = new User_auth({
      name,
      phone,
      password,
      role,
      marketArea: normalizedMarketArea, // Use the normalized value
    });

    const salt = await bcrypt_auth.genSalt(10);
    user.password = await bcrypt_auth.hash(password, salt);

    await user.save();

    const payload = {
      user: { id: user.id, role: user.role, marketArea: user.marketArea },
    };
    jwt_auth_route.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router_auth.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    let user = await User_auth.findOne({ phone });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt_auth.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: { id: user.id, role: user.role, marketArea: user.marketArea },
    };
    jwt_auth_route.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router_auth;
