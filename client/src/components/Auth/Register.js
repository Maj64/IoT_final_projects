import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { signup } from "../../utils/auth";

const Signup = () => {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // dispatch(signupFailure("Passwords do not match"));
      return;
    }
    try {
      // const user = await signup(email, password);
      // dispatch(signupSuccess(user));
    } catch (error) {
      // dispatch(signupFailure(error.message));
    }
  };

  return (
    <div className="container">
      <h2>Register Page</h2>
      {/* <form onSubmit={handleSignup}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign up</button>
      </form> */}
    </div>
  );
};

export default Signup;
