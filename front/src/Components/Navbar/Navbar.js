import React from "react";
import classes from "./Navbar.module.css";
import logo from "../../logo.svg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={classes.menu + " shadow"}>
      <div className={classes.navhover}>
        <img src={logo} className={classes.AppLogo} alt="logo" />
        <NavLink to="/" className={classes.active}>
          Home
        </NavLink>
        <NavLink to="/">Services</NavLink>
        <NavLink to="/">Contact</NavLink>
        <NavLink
          to="/exam-setup"
          className={classes.gradientButton + " " + classes.gradientButton1}
        >
          Start Test
        </NavLink>
      </div>

      <div className="d-flex">
        {!isAuthenticated ? (
          <>
            <NavLink to="/signup">
              <div className={classes.signup}>
                <span>Register</span>
              </div>
            </NavLink>
            <NavLink to="/login">
              <div className={classes.signup}>
                <span>Login</span>
              </div>
            </NavLink>
          </>
        ) : (
          <NavLink to="/" onClick={logoutHandler}>
            <div className={classes.signup}>
              <span>Logout</span>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
