import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import "../../styles/page/User.scss";

const MyTable = () => {
  // Sample data for the table
  const [data, setData] = useState([
    { id: 1, name: "John Doe", age: 25, email: "john.doe@example.com" },
    { id: 2, name: "Jane Doe", age: 30, email: "jane.doe@example.com" },
    { id: 3, name: "Bob Smith", age: 40, email: "bob.smith@example.com" },
    {
      id: 4,
      name: "Alice Johnson",
      age: 22,
      email: "alice.johnson@example.com",
    },
    { id: 5, name: "David Brown", age: 35, email: "david.brown@example.com" },
    { id: 6, name: "Emily Davis", age: 28, email: "emily.davis@example.com" },
  ]);

  // State variables for handling modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  // State variable for handling pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Constants for pagination
  const ROWS_PER_PAGE = 3;
  const NUM_PAGES = Math.ceil(data.length / ROWS_PER_PAGE);

  // Function to handle adding a new row
  const handleAddRow = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newRow = {
      id: newId,
      name: event.target.name.value,
      age: parseInt(event.target.age.value),
      email: event.target.email.value,
    };
    setData([...data, newRow]);
    setShowAddModal(false);
  };

  // Function to handle editing a row
  const handleEditRow = (event) => {
    event.preventDefault();
    const updatedRow = {
      id: selectedRow.id,
      name: event.target.name.value,
      age: parseInt(event.target.age.value),
      email: event.target.email.value,
    };
    const newData = data.map((row) => {
      if (row.id === selectedRow.id) {
        return updatedRow;
      } else {
        return row;
      }
    });
    setData(newData);
    setShowEditModal(false);
  };

  // Function to handle deleting a row
  const handleDeleteRow = (id) => {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  };

  // Function to handle clicking on a row
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  // Function to handle clicking on the pagination
  const handlePaginationClick = (event) => {
    const pageNumber = parseInt(event.target.text);
    setCurrentPage(pageNumber);
  };

  // Function to get the data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  };

  // JSX for the table
  return (
    <>
      <Container className="user-container">
        <Row>
          <Col xs={2}>
            <h2>User List</h2>
          </Col>
          <Col xs={{ span: 1, offset: 9 }}>
            <Button variant="primary">Add</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map((row) => (
                  <tr key={row.id} onClick={() => handleRowClick(row)}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.age}</td>
                    <td>{row.email}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => setShowEditModal(true)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteRow(row.id)}
                      >
                        Delete
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Pagination */}
            <Pagination>
              {[...Array(NUM_PAGES)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={handlePaginationClick}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>

      {/* Add Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddRow}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" placeholder="Enter age" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditRow}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={selectedRow.name}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                defaultValue={selectedRow.age}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={selectedRow.email}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyTable;
