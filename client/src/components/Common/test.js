import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import FormComponent from "./Form";

const SensorList = () => {
  const [showModal, setShowModal] = useState(false);
  const [sensors, setSensors] = useState([
    { id: 1, name: "Sensor 1", keyCode: "123", status: "Live", user: "User 1" },
    {
      id: 2,
      name: "Sensor 2",
      keyCode: "456",
      status: "Offline",
      user: "User 2",
    },
  ]);
  const [selectedSensor, setSelectedSensor] = useState({});
  const [formInputs, setFormInputs] = useState([
    { name: "Name", field: "name", type: "text" },
    { name: "Key Code", field: "keyCode", type: "text" },
    { name: "Status", field: "status", type: "text" },
    { name: "User", field: "user", type: "text" },
  ]);

  const handleAddSensor = () => {
    setShowModal(true);
    setSelectedSensor({});
  };

  const handleEditSensor = (sensor) => {
    setShowModal(true);
    setSelectedSensor(sensor);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmitForm = (formData) => {
    let updatedSensors;
    if (selectedSensor.id) {
      updatedSensors = sensors.map((sensor) => {
        if (sensor.id === selectedSensor.id) {
          return { ...sensor, ...formData };
        }
        return sensor;
      });
    } else {
      const newSensor = { id: Date.now(), ...formData };
      updatedSensors = [...sensors, newSensor];
    }
    setSensors(updatedSensors);
    setShowModal(false);
  };

  const handleDeleteSensor = (sensor) => {
    const updatedSensors = sensors.filter((s) => s.id !== sensor.id);
    setSensors(updatedSensors);
  };

  return (
    <>
      <h1>Sensor List</h1>
      <Button variant="primary" onClick={handleAddSensor}>
        Add Sensor
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Key Code</th>
            <th>Status</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>{sensor.name}</td>
              <td>{sensor.keyCode}</td>
              <td>{sensor.status}</td>
              <td>{sensor.user}</td>
              <td>
                <Button variant="info" onClick={() => handleEditSensor(sensor)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteSensor(sensor)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
