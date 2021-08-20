import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

const Signup = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
//   const emailRef = useRef();
//   const passwordRef = useRef();

  const SignupHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="contain">
      <div className="form">
        <h2>Signup</h2>
        <div className="input">
          <div className="inputbox">
            <label className="label">Email</label>
            <input
              type="text"
              className="user loginInput"
              id="user"
              placeholder="example@xyz.com"
            />
          </div>
          <div className="inputbox">
            <label className="label">Password</label>
            <input
              type="password"
              className="pass loginInput"
              id="pass"
              placeholder="........"
            />
          </div>
          <div className="inputbox pb-2">
            <label className="label">Key</label>
            <input
              type="text"
              className="user loginInput"
              id="user"
              placeholder=""
            />
          </div>

          <hr />

          <div className="inputBox">
            <input type="submit" value="Signup" className="login loginInput" />
          </div>
        </div>
        <p>Dont have a Key? contact your instructor</p>
        <p>
          Already have an account?
          <Link to="/"> Click Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
