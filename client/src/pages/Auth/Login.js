import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Login.scss";

import { loginAsync } from "../../store/actions/authSlice";

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [isShowPassword, setShowPassword] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    history.push("/dashboard");
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      email: username,
      password,
    };
    dispatch(loginAsync(credentials));
    history.push("/dashboard");
  };

  const handlePasswordRetrieval = () => {
    // dispatch({ type: "AUTHENTICATE_SUCCESS" });
    // history.push("/dashboard");
    console.log("This is developing");
  };

  const ButtonForm = ({ title, onClick }) => (
    <div id="button" className="row">
      <button type="button" onClick={(e) => onClick(e)}>
        {title}
      </button>
    </div>
  );

  return (
    <div className="login-background">
      <div className="loginForm-container">
        <span className="headerTitle">Login Page</span>
        {/* <button onClick={handleClick}>Auth</button> */}
        <div className="row">
          <div className="row-label">
            <label>{"Username"}</label>
          </div>
          <div className="row-input">
            <input
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="row-label">
            <label>{"Password"}</label>
          </div>
          <div className="row-input">
            <div className="custom-input-password">
              <input
                placeholder="Enter your password"
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!isShowPassword)}>
                <i
                  className={
                    !isShowPassword ? "far fa-eye-slash" : "far fa-eye"
                  }
                />
              </span>
            </div>
          </div>
        </div>
        <div className="action">
          <div className="specialText right" onClick={handlePasswordRetrieval}>
            <span>Forgot password ?</span>
          </div>
          {warning && <div className="specialText left">{warning}</div>}
          <ButtonForm title="Login" onClick={handleLogin} />
          <div className="link">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
