const express = require("express");
const router = express.Router();
const {
  registerUser,
  registerPublicUser,
  getLoggedUser,
  logOut,
  loginUser,
  test,
  getUser,
  createPrivateUser,
  updatePrivateUser,
  deletePrivateUser,
  getExamUsers
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//admin routes-------------------------------------------------------------------------//

//get user by id
router.get("/users/:userId", isAuthenticatedUser, authorizeRoles("issuer"), getUser);


//get all users who took a certain exam
//TODO add some filters
router.get("/users/exam/:examId", isAuthenticatedUser, authorizeRoles("issuer"), getExamUsers);

//create a new private user that has a one time exam (and return a link)
router.post("/users", isAuthenticatedUser, authorizeRoles("issuer"), createPrivateUser)

//edit a private user
router.put("/users/:userId", isAuthenticatedUser, authorizeRoles("issuer"), updatePrivateUser)

// delete a private user
router.delete("/users/:userId", isAuthenticatedUser, authorizeRoles("issuer"), deletePrivateUser)

//--------------------------------------------------------------------------------------

//testing api
router.get("/test", test);

//create new user
router.post("/signup", registerUser);

//create new public user
router.post("/public-user", registerPublicUser);

//change the status of public user exam to finished
// router.post("/public-user", registerPublicUser);

//login user
router.post("/login", loginUser);

//get logged in user user details
router.get("/me", isAuthenticatedUser, getLoggedUser);

//logout user
router.get("/logout", logOut);

module.exports = router;
