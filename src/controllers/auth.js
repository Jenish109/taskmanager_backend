const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return next(new ErrorResponse('Please provide all required fields', 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('Email already registered', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Create token
  const token = user.getSignedJwtToken();

  // Return response without password
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    // token,
    user: userResponse,
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  const token = user.getSignedJwtToken();

  // Return response without password
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  res.status(200).json({
    success: true,
    token,
    user: userResponse,
  });
});