// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../../utils/auth';

// const Login = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await login(email, password);
//       dispatch(loginSuccess(user));
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <label>
//         Email:
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </label>
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Login.scss";

// import { login } from '../actions/auth';

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

  const handleLogin = (event) => {
    event.preventDefault();
    const userNameFormat = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    console.log(">>>", username, userNameFormat.test(username), password);
    setWarning("error");
    // dispatch(login(username, password));
  };

  const handleRegister = () => {
    history.push("/register");
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
          <label>{"Username"}</label>
          <input
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="row">
          <label>{"Username"}</label>
          <div className="custom-input-password">
            <input
              placeholder="Enter your password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!isShowPassword)}>
              <i class={!isShowPassword ? "far fa-eye-slash" : "far fa-eye"} />
            </span>
          </div>
        </div>
        <div className="specialText right" onClick={handlePasswordRetrieval}>
          <span>Forgot password ?</span>
        </div>
        <div className="specialText left">{warning && warning}</div>
        <ButtonForm title="Login" onClick={handleLogin} />
        <div style={{ textAlign: "center" }}>
          <span>Or: </span>
        </div>
        <ButtonForm title="Register" onClick={handleRegister} />
      </div>
    </div>
  );
}

export default LoginForm;
