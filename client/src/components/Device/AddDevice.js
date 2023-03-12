// AddSensor.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { addSensor } from "../actions";
import "./addDevice.scss";

function AddSensor(props) {
  const { isShowAddForm, setShowAddForm } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newSensor = { name, description, location };
    // dispatch(addSensor(newSensor));
    // history.push("/");
  };

  return isShowAddForm ? (
    <div className="addForm-container">
      <div className="addForm-header">
        <div className="addForm-button" onClick={() => setShowAddForm(false)}>
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
      </div>
      <div className="addForm-body">
        <div className="row">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row">
          <label>Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="row">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="row">
          <button type="button" onClick={handleSubmit}>
            Add Sensor
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default AddSensor;
