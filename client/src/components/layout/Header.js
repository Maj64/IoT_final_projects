import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { logout } from '../../actions/auth';
import "./header.scss";

function Header(props) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isLogin = false;

  const handleLogout = () => {
    // dispatch(logout());
  };

  return (
    <div className="header-background">
      <div className="header-container">
        <div className="headerTitle">
          <Link to={"/dashboard"}>Water Quality Monitoring</Link>
        </div>
        {isLogin ? (
          <div className="userForm">
            <Link to={"/login"}>Logout</Link>
          </div>
        ) : (
          <div className="userForm">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
