import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const FormComponent = ({
    modalData,
    dataForm,
    formInputList,
    onSubmitForm,
    onCloseModal,
}) => {

    const [formValues, setFormValues] = useState(dataForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     // const { name, value } = e.target;
//     // const newInput = {};
//     // newInput[name] = value;
//     // setInputs({ ...input, newInput});
//   };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // // const formData = {};
    // // formInput.forEach((input) => {
    // //   formData[input.field] = event.target.value;
    // // });
    // onSubmitForm(input);
    // onCloseModal();
    event.preventDefault();
    console.log(formValues);
    onSubmitForm(formValues);
    onCloseModal();
  };

  const handleClose = () => {
    onCloseModal();
  }

  const renderFormInput = () => {
    return formInputList.map((formInputItem, index) => (
      <Form.Group key={formInputItem.field}>
        <Form.Label>{formInputItem.name}</Form.Label>
        <Form.Control
          type={formInputItem.type}
          name={formInputItem.field}
          placeholder={`Enter ${formInputItem.field}`}
          value={formValues[formInputItem.field]}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
    ));
  };

  return (
    <div>
      <Modal show={modalData.visible} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{renderFormInput()}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="primary" type="button" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormComponent;
