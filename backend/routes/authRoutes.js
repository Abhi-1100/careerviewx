const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../services/emailService");

// ============= SIGNUP - Register new user =============
router.post("/signup", async (req, res) => {
  const { name, email, password, education = "", stream = "", rememberMe = true } = req.body;

  try {
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please login instead."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpire = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      education: education,
      stream: stream,
      emailVerificationToken: verificationToken,
      emailVerificationExpire: verificationExpire
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken, user.name);

    // Generate JWT token with variable expiration based on rememberMe
    const tokenExpiration = rememberMe ? "30d" : "24h";
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiration }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully. Please verify your email.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        education: user.education,
        stream: user.stream,
        emailVerified: user.emailVerified,
        assessmentHistory: [],
        careerPaths: [],
        careerSuggestions: []
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during signup"
    });
  }
});

// ============= LOGIN - Authenticate user =============
router.post("/login", async (req, res) => {
  const { email, password, rememberMe = false } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token with variable expiration based on rememberMe
    const tokenExpiration = rememberMe ? "30d" : "24h";
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiration }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        education: user.education,
        stream: user.stream,
        emailVerified: user.emailVerified,
        phone: user.phone,
        bio: user.bio,
        recommendedCareer: user.recommendedCareer,
        assessmentHistory: user.assessmentHistory,
        careerPaths: user.careerPaths,
        careerSuggestions: user.careerSuggestions
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
});

// ============= GOOGLE SIGNIN - OAuth authentication =============
router.post("/google-signin", async (req, res) => {
  const { googleId, name, email, picture } = req.body;

  try {
    if (!googleId || !email) {
      return res.status(400).json({
        success: false,
        message: "Google ID and email are required"
      });
    }

    // Find or create user with Google ID
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // User exists, update Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new user from Google data
      user = new User({
        name: name || "Google User",
        email: email.toLowerCase(),
        googleId: googleId,
        password: await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10), // Random password
        emailVerified: true // Google emails are pre-verified
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      success: true,
      message: "Google signin successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        education: user.education,
        stream: user.stream,
        emailVerified: user.emailVerified,
        phone: user.phone,
        bio: user.bio,
        assessmentHistory: user.assessmentHistory,
        careerPaths: user.careerPaths,
        careerSuggestions: user.careerSuggestions
      }
    });

  } catch (error) {
    console.error("Google signin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during Google signin"
    });
  }
});

// ============= VERIFY EMAIL - Verify email token =============
router.post("/verify-email", async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required"
      });
    }

    // Find user with this verification token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token"
      });
    }

    // Mark email as verified
    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpire = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during email verification"
    });
  }
});

// ============= RESEND VERIFICATION EMAIL =============
router.post("/resend-verification", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified"
      });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpire = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpire = verificationExpire;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken, user.name);

    res.status(200).json({
      success: true,
      message: "Verification email resent successfully"
    });

  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while resending verification email"
    });
  }
});

// ============= FORGOT PASSWORD - Send password reset email =============
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if email exists for security
      return res.status(200).json({
        success: true,
        message: "If an account exists with that email, a password reset link will be sent"
      });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpire = resetExpire;
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(user.email, resetToken, user.name);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to email"
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while processing forgot password request"
    });
  }
});

// ============= RESET PASSWORD - Reset password with token =============
router.post("/reset-password", async (req, res) => {
  const { token, password, passwordConfirm } = req.body;

  try {
    if (!token || !password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Token, password, and password confirmation are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpire = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully. Please login with your new password."
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during password reset"
    });
  }
});

// ============= LOGOUT (Client-side token removal, but endpoint for consistency) =============
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully"
  });
});

// ============= UPDATE PROFILE - Update user education and stream =============
router.put("/profile/update", require("../middleware/authMiddleware"), async (req, res) => {
  try {
    const { name, education, stream, phone, bio } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (education) updateData.education = education;
    if (stream) updateData.stream = stream;
    if (phone !== undefined) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        education: user.education,
        stream: user.stream,
        phone: user.phone,
        bio: user.bio,
        emailVerified: user.emailVerified,
        assessmentHistory: user.assessmentHistory,
        careerPaths: user.careerPaths,
        careerSuggestions: user.careerSuggestions
      }
    });

  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during profile update"
    });
  }
});

module.exports = router;
