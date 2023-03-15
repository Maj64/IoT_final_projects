import React, { useState } from "react";
import Toggle from "react-bootstrap-toggle";
import { Col, Row, Table, Button, Container, Form } from "react-bootstrap";

import "../../styles/Common/Table.scss";

const TableComponent = ({
  dataSource,
  columns,
  titleTable,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onToggle
}) => {
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

  const handleDeleteRow = (e, dataRow) => {
    e.stopPropagation();
    onDeleteItem(dataRow);
  };

  const handleToggle = (e, dataRow) => {
    console.log("data", !e);
    const dataEdit = {
      ...dataRow,
      statusId: e
    }
    onToggle(dataEdit)
  }

  const handleEditRow = (e, dataRow) => {
    onEditItem(dataRow);
  };

  const handleAddRow = (e) => {
    e.stopPropagation();
    onAddItem();
  };

  const renderTableRows = () => {
    const currentPageData = getCurrentPageData();
    return currentPageData.map((dataRow) => (
      <tr key={dataRow.id}>
        {columns.map((column, index) => {
          if (column.field === "statusId") {
            
            return (
              <td key={index}>
                <Toggle
                  onClick={(e) => handleToggle(e, dataRow)}
                  className="toggle-btn"
                  size="xs"
                  onstyle="success"
                  active={JSON.parse(dataRow[column.field])}
                />
              </td>
            );
          } else {
            return <td key={index}>{dataRow[column.field]}</td>;
          }
        })}
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
            <Button variant="success" onClick={handleAddRow}>
              Add Device
            </Button>{" "}
          </Col>
        </Row>
        <Row className="mb-2 row-table">
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.name}</th>
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
