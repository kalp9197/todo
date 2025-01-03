import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        msg: "Email ID is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      msg: "User created successfully",
    });
  } catch (err) {
    console.error("Error in registration:", err);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        msg: "Wrong input either password or email are wrong",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(403).json({ msg: "Incorrect email or password" });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ msg: `Login successful, Welcome back ${user.fullName}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      msg: "User logged out successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};