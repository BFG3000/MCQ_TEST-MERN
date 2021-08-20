import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import { Link, useHistory } from "react-router-dom";
import logo from "../../logo.svg";
import "./Login.css";

const Login = () => {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const history = useHistory()
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  // const { notification } = useSelector((state) => state.notification);
  
  // console.log(notification);


  const loginHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(loginUser({ email, password }));

    history.push('/')
  };
  return (
    <div className="contain">
      <form onSubmit={loginHandler} className="form">
        <h2>Login</h2>
        <div className="input">
          <div className="inputbox">
            <label className="label">Email</label>
            <input
              type="text"
              className="user loginInput"
              id="user"
              placeholder="example@xyz.com"
              // onChange={(e)=>setEmail(e.target.value)}
              required
              ref={emailRef}
            />
          </div>
          <div className="inputbox">
            <label className="label">Password</label>
            <input
              type="password"
              className="pass loginInput"
              id="pass"
              placeholder="........"
              //onChange={(e)=>setPassword(e.target.value)}
              required
              ref={passwordRef}
            />
          </div>
          <div className="inputBox">
            <input type="submit" value="LOGIN" className="login loginInput" />
          </div>
        </div>
        <p>
          Forget Password?
          <Link to="/"> Click Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
