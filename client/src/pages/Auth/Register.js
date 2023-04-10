import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Register.scss";
import { Fragment } from "react";
// import { useDispatch } from "react-redux";
// import { signup } from "../../utils/auth";
const formInput = [
  { type: "text", nameInput: "email", labelWidth: 2 },
  { type: "password", nameInput: "password", labelWidth: 4, tagForm: "password" },
  {
    type: "password",
    nameInput: "confirm password",
    labelWidth: 4,
    tagForm: "password",
  },
  { type: "text", nameInput: "first name", labelWidth: 4, tagForm: "name" },
  { type: "text", nameInput: "last name", labelWidth: 4, tagForm: "name" },
  { type: "text", nameInput: "username", labelWidth: 4, tagForm: "info" },
  { type: "text", nameInput: "phone", labelWidth: 4, tagForm: "info" },
  { type: "text", nameInput: "address", labelWidth: 2}
];

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

  const ButtonForm = ({ title, onClick }) => {
    return (
      <div id="button" className="btn">
        <button type="button" className="btn" onClick={(e) => onClick(e)}>
          {title}
        </button>
      </div>
    );
  };

  const renderInputForm = ({ type, nameInput, labelWidth }, arrayClass) => {
    let gridWidth = 12;
    return (
      <div className={`row ${arrayClass}`}>
        <div className={`col-md-${labelWidth}`}>
          <label htmlFor={`input${nameInput}`}>{renderTitle(nameInput)}</label>
        </div>
        <input
          type={type}
          className={`form-control col-md-${gridWidth - labelWidth}`}
          name={nameInput}
          placeholder={`Enter your ${nameInput}`}
          value={registerInfo[nameInput]}
          onChange={(e) => handleValueChanged(e.target)}
        />
      </div>
    );
  };

  const renderForm = () => {
    const groups = {};
    const arrayClass = "form-group";
    // Group the elements by property
    for (let i = 0; i < formInput.length; i++) {
      const value = formInput[i].tagForm;
      if (!groups[value]) {
        groups[value] = [];
      }
      groups[value].push(formInput[i]);
    }

    return (
      <>
        {Object.entries(groups).map(([value, group]) => {
          if (value === "undefined") {
            return (
              <>
                {group.map((item) => (
                  <Fragment key={item.nameInput}>
                    {renderInputForm(item, arrayClass)}
                  </Fragment>
                ))}
              </>
            );
          } else {
            return (
              <div className="line row">
                {group.map((item) => (
                  <div className="col-md-6" key={item.nameInput}>
                    {renderInputForm(item, arrayClass)}
                  </div>
                ))}
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <div className="form-container">
          <div className="form-title">
            <h2>Register</h2>
          </div>
          <div className="form-content">
            {renderForm()}
            <div className="row form-group">
              <div className="col-md-2">
                <label htmlFor="inputState">{renderTitle("Gender")}</label>
              </div>
              <select
                name="gender"
                className="form-control col-md-3"
                value={registerInfo.gender}
                onChange={(e) => handleValueChanged(e.target)}
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>
          <div className="form-action">
            <ButtonForm title="Register" onClick={handleRegister} />
            <div className="link">
              <span>Have an account? </span>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
