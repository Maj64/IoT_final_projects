import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../styles/Layout/layout.scss"
// import "./layout.scss";

const DefaultLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <Container fluid className={"no-gutters mx-0 px-0"}>
        <Row className={"no-gutters mx-0 px-0"}>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row className={"no-gutters mx-0 px-0"}>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <div className="content">{children}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(DefaultLayout);
