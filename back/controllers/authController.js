const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

exports.test = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "yay! this thing is working",
  });
};

//Create new user => api/signup -----------------------------------------------------------------------------
exports.registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  console.log(email);
  //i should check if email is unique since i removed the check from the model
  const checkup = await User.find({ email: email, role: "user" });
  console.log(checkup);
  if (checkup.length > 0) return next(new ErrorHandler("email is already used", 400));
  try {
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//Create new public-user => api/public-user -----------------------------------------------------------------------------
exports.registerPublicUser = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      phone,
      role: "public-user",
    });
    res.status(200).json({
      success: true,
      userId: user._id,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//login a user => api/login----------------------------------------------
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 401));
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    //user exists?
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    //match the 2 hashed passwords
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//Get currently logged in user /api/me-------------------------------------------
exports.getLoggedUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//logout user => api/logout-------------------------------------------
exports.logOut = async (req, res, next) => {
  res.cookie("ShadowJesus1998", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("user not found", 404));
  }
};

exports.createPrivateUser = async (req, res, next) => {
  const { name, email, phone, exam_id } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      phone,
      role: "private",
      exam_id,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("user not found", 404));
  }
};

exports.updatePrivateUser = async (req, res, next) => {
  const { name, email, phone, exam_id } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.exam_id = exam_id;
    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("user not found", 404));
  }
};

exports.deletePrivateUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler("user not found", 404));
  }
};

exports.getExamUsers = async (req, res, next) => {
  const { examId } = req.params;
  try {
    const users = await User.find({ exam_id: examId });
    res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
};
