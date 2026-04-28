import User from "../models/User.js"
import jwt from "jsonwebtoken"

export async function register(req, res) {
  try {
    const input = req.body

    const existingUser = await User.findOne({ email: input?.email })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        details: { email: input?.email }
      })
    }

    const newUser = await User.create({
      email: input?.email,
      name: input?.name,
      password: input?.password
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: { userId: newUser._id }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during registration."
    })
  }
}


export async function login(req, res) {
  try {
    const input = req.body

    const existingUser = await User.findOne({ email: input?.email })

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
        details: { email: input?.email }
      })
    }

    const passwordMatch = await existingUser.comparePassword(input.password)

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password."
      })
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.status(200).json({
      success: true,
      message: "Log in successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name
      },
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during login."
    })
  }
}
