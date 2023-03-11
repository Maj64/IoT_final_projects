import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Register.scss";
// import { useDispatch } from "react-redux";
// import { signup } from "../../utils/auth";

function Register() {
  // const dispatch = useDispatch();
  const [isShowPassword, setShowPassword] = useState(false);
  const [warning, setWarning] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    gender: 1,
    roleId: "user",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    console.log("data: ", registerInfo);
    const { password } = registerInfo;
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

  const handleValueChanged = (data) => {
    setRegisterInfo({ ...registerInfo, [data.name]: data.value });
  };

  const renderTitle = (title) => (
    <span>
      <span>{title}</span>
      <span style={{ color: "red" }}>*</span>
    </span>
  );

  return (
    <div className="register-background">
      <div className="register-container">
        <div className="headerTitle">Register</div>
        <div className="inputForm">
          {/* <div className="form-row"> */}
          <div className="form-group col-md-6">
            <label for="inputEmail4">{renderTitle("Email")}</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={registerInfo.email}
              onChange={(e) => handleValueChanged(e.target)}
            />
          </div>
          {/* </div> */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputPassword">{renderTitle("Password")}</label>
              <div className="custom-input-password">
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={registerInfo.password}
                  onChange={(e) => {
                    handleValueChanged(e.target);
                    if (
                      e.target.value === confirmPassword &&
                      warning === "Password"
                    ) {
                      setWarning("");
                    }
                  }}
                />
                <span onClick={() => setShowPassword(!isShowPassword)}>
                  <i
                    class={!isShowPassword ? "far fa-eye-slash" : "far fa-eye"}
                  />
                </span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label for="inputConfirmPassword">
                {renderTitle("Confirm Password")}
              </label>
              <div className="custom-input-password">
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="form-control"
                  name="Confirm Password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (
                      registerInfo.password === e.target.value &&
                      warning === "Password"
                    ) {
                      setWarning("");
                    }
                  }}
                  onBlur={() => {
                    if (registerInfo.password !== confirmPassword) {
                      setWarning("Password");
                    }
                  }}
                />
                <span onClick={() => setShowPassword(!isShowPassword)}>
                  <i
                    class={!isShowPassword ? "far fa-eye-slash" : "far fa-eye"}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">{renderTitle("Firstname")}</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="Firstname"
                value={registerInfo.firstName}
                onChange={(e) => handleValueChanged(e.target)}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">{renderTitle("Lastname")}</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Lastname"
                value={registerInfo.lastName}
                onChange={(e) => handleValueChanged(e.target)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label for="username">{renderTitle("Username")}</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                value={registerInfo.username}
                onChange={(e) => handleValueChanged(e.target)}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputCity">{renderTitle("Phone number")}</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                placeholder="Phone number"
                value={registerInfo.phoneNumber}
                onChange={(e) => handleValueChanged(e.target)}
              />
            </div>
          </div>
          {/* <div className="form-row"> */}
          <div className="form-group">
            <label for="inputAddress">{renderTitle("Address")}</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="VD: 1234 Main St"
              value={registerInfo.address}
              onChange={(e) => handleValueChanged(e.target)}
            />
          </div>
          {/* </div> */}
          <div className="form-row">
            <div className="form-group col-md-3">
              <label for="inputState">{renderTitle("Sex")}</label>
              <select
                name="gender"
                className="form-control"
                value={registerInfo.gender}
                onChange={(e) => handleValueChanged(e.target)}
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            {/* <div className="form-group col-md-3">
              <label for="inputState">{renderTitle("Role")}</label>
              <select name="roleId" className="form-control">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div> */}
          </div>
          <div className="specialText">{warning && warning}</div>
          <div className="formButton">
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
