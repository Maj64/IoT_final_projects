import React, { useState } from "react";
import { Col, Row, Table, Button, Container } from "react-bootstrap";

import "../../styles/Common/Table.scss"

const TableComponent = ({ dataSource, columns, titleTable, onAddItem }) => {
  // State variable for handling pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Constants for pagination
  const ROWS_PER_PAGE = 3;
  const NUM_PAGES = Math.ceil(dataSource.length / ROWS_PER_PAGE);

  // Function to get the data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return dataSource.slice(startIndex, endIndex);
  };

  const handleRowClick = (dataRow) => {
    console.log("Clicked row", dataRow);
  };

  const handleDeleteRow = (e, dataRow) => {
    e.stopPropagation();
    console.log("Deleted row", dataRow);
  };

  const handleEditRow = (e, dataRow) => {
    e.stopPropagation();
    console.log("Edit row", dataRow);
  };

  const renderTableRows = () => {
    const currentPageData = getCurrentPageData();
    return currentPageData.map((dataRow) => (
      <tr key={dataRow.id} onClick={() => handleRowClick(dataRow)}>
        {columns.map((column) => (
          <td key={column.field}>{dataRow[column.field]}</td>
        ))}
        <td className="actions">
          <Button variant="primary" onClick={(e) => handleEditRow(e, dataRow)}>
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={(e) => handleDeleteRow(e, dataRow)}>
            Delete
          </Button>{" "}
        </td>
      </tr>
    ));
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= NUM_PAGES; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant={i === currentPage ? "primary" : "secondary"}
          onClick={() => setCurrentPage(i)}
          className="pagination-btn"
        >
          {i}
        </Button>
      );
    }
    return pageButtons;
  };

  return (
    <div>
      <Container className="container">
        <Row className="mb-2">
          <Col xs={2}>
            <h2>{titleTable}</h2>
          </Col>
          <Col xs={{ span: 2, offset: 8 }}>
            <Button variant="success" onClick={onAddItem}>Add Device</Button>{" "}
          </Col>
        </Row>
        <Row className="mb-2 row-table">
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.field}>{column.name}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </Table>
        </Row>
        <Row className="mb-2">
          <Col xs={{ span: 2, offset: 10 }}>{renderPageButtons()}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default TableComponent;
