import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const FormComponent = ({
  titleForm,
  formInput,
  showModal,
  onSubmitForm,
  onCloseModal,
}) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {};
    formInput.forEach((input) => {
      formData[input.field] = event.target[input.field].value;
    });
    onSubmitForm(formData);
    onCloseModal();
  };

  const renderFormInput = () => {
    const inputList = formInput;
    return inputList.map((inputItem) => (
      <Form.Group key={inputItem.field}>
        <Form.Label>{inputItem.name}</Form.Label>
        <Form.Control
          type={inputItem.type}
          name={inputItem.field}
          placeholder={`Enter ${inputItem.field}`}
        />
      </Form.Group>
    ));
  };

  return (
    <div>
      <Modal show={showModal} onHide={onCloseModal} backdrop="static">
        <Modal.Header>
          <Modal.Title>{titleForm}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>{renderFormInput()}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCloseModal}>Close</Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormComponent;
