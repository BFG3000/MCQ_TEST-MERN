//send token to cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("ShadowJesus1998", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
