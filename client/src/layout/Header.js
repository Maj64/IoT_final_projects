import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Image, Navbar, Row } from "react-bootstrap";
// import { logout } from '../../actions/auth';
import "../styles/Layout/header.scss";
import logo from "../assets/svg/droplet-half.svg"
import { logoutSuccess } from "../store/actions/authSlice";

function Header(props) {
  const dispatch = useDispatch();
  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isLogin = true;

  const handleLogout = () => {
    dispatch(logoutSuccess())
  };

  return (
    <>
      <Container fluid className={"no-gutters mx-0 px-0 header-container"}>
        <Row className={"no-gutters mx-0 px-0"}>
          <Col xs={2}>
            <Navbar expand="sm" className="header-logo">
              <Navbar.Brand className="headerTitle">
                <Link to={"/dashboard"}>
                  <Image src={logo} alt="logo" width="50" height="50" id="logo" />
                  Water Quality Monitoring
                </Link>
              </Navbar.Brand>
            </Navbar>
            {/* <Link to={"/dashboard"}>Water Quality Monitoring</Link> */}
          </Col>
          <Col xs={{ span: 2, offset: 8 }}>
            {isLogin ? (
              <div className="userForm">
                <Link onClick={handleLogout} to="#">Logout</Link>
                {/* <button onClick={handleLogout} className="userForm">Logout</button> */}
              </div>
            ) : (
              <div className="userForm">
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {/* <div className="header-background">
      <div className="header-container">
        <Row>
          <Col xs={2}>
            <Link to={"/dashboard"}>Water Quality Monitoring</Link>
          </Col>
          <Col xs={10}>
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
          </Col>
        </Row>
      </div>
    </div> */}
    </>
  );
}

export default Header;
