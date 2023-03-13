// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form } from "react-bootstrap";

// const FormComponent = ({
//   titleForm,
//   formInput,
//   showModal,
//   onSubmitForm,
//   onCloseModal,
// }) => {
//   const [inputs, setInputs] = useState([]);
  

//   useEffect(() => {
//     if (formInput) {
//       setInputs(formInput.variants.map((variant) => ({
//         name: variant.name,
//         price: variant.price
//       })));
//     }
//   }, [formInput]);

//   const handleChange = (e, field) => {
//     const { name, value } = e.target;
//     const newInput = {};
//     newInput[name] = value;
//     setInputs({ ...input, newInput});
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // const formData = {};
//     // formInput.forEach((input) => {
//     //   formData[input.field] = event.target.value;
//     // });
//     onSubmitForm(input);
//     onCloseModal();
//   };

//   const renderFormInput = () => {
//     const inputList = formInput;
//     return inputList.map((inputItem, index) => (
//       <Form.Group key={inputItem.field}>
//         <Form.Label>{inputItem.name}</Form.Label>
//         <Form.Control
//           type={inputItem.type}
//           name={inputItem.field}
//           placeholder={`Enter ${inputItem.field}`}
//           onChange={(e) => handleChange(e, inputItem.field)}
//         />
//       </Form.Group>
//     ));
//   };

//   return (
//     <div>
//       <Modal show={showModal} onHide={onCloseModal} backdrop="static">
//         <Modal.Header>
//           <Modal.Title>{titleForm}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>{renderFormInput()}</Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={onCloseModal}>Close</Button>
//           <Button variant="primary" type="button" onClick={handleFormSubmit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default FormComponent;
