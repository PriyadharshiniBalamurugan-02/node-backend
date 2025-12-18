


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER USER
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // 3️⃣ Password strength check (basic)
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 6️⃣ Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse
    });

  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({
      message: "Server error during registration"
    });
  }
};

/**
 * LOGIN USER
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5️⃣ Success response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      message: "Server error during login"
    });
  }
};

// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hash, role });
//   res.json(user);
// };

// exports.login = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).json({ message: "User not found" });

//   const ok = await bcrypt.compare(req.body.password, user.password);
//   if (!ok) return res.status(400).json({ message: "Wrong password" });

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   res.json({ token });
// };
