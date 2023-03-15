import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const SensorDropdown = ({ sensorList, onSelect }) => {
  const [selectedSensor, setSelectedSensor] = useState(null);

  const handleSelect = (eventKey) => {
    console.log(eventKey);
    const selected = sensorList.find((sensor) => sensor.id === eventKey);
    onSelect(eventKey)
    setSelectedSensor(selected);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="sensor-dropdown">
        {selectedSensor ? selectedSensor.name : "Select a sensor"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {sensorList.map((sensor) => (
          <Dropdown.Item key={sensor.id} eventKey={sensor.id}>
            {sensor.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SensorDropdown;
