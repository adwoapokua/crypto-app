import express from "express"
import { login, register } from "../controllers/authController";
import protect from "../middleware/authMiddleware"

const router = express.Router()

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Private/Protected Route Example
router.get('/me', protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User profile retrieved.",
        data: { userId: req.user.id }
    });
});

module.exports = router;