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


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory  } from "react-router-dom";

// import { login } from '../actions/auth';

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = event => {
    event.preventDefault();
    // dispatch(login(username, password));
  };

  function handleClick() {
    dispatch({ type: 'AUTHENTICATE_SUCCESS'})
    history.push("/dashboard");
  }

  return (
    <div className="container">
      <h2>Login Page</h2>
      <button onClick={handleClick}>Auth</button>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form> */}
    </div>
  );
}

export default LoginForm;
