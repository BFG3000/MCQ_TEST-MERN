const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");

//Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
  const { ShadowJesus1998 } = req.cookies;

  // console.log(token);
  if (!ShadowJesus1998) {
    return next(new ErrorHandler("Loign first to access this resource", 401));
  }
  try {
    const decoded = jwt.verify(ShadowJesus1998, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Error invalid token" + error, 401));
  }
};

//Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
