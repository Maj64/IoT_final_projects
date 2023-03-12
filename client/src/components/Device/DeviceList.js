// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteSensor } from '../../actions/sensors';
// import { Link } from 'react-router-dom';

// const Sensor = ({ sensor }) => {
//   const dispatch = useDispatch();

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this sensor?')) {
//       dispatch(deleteSensor(sensor.id));
//     }
//   };

//   return (
//     <div>
//       <Link to={`/sensors/${sensor.id}`}>
//         {sensor.name} ({sensor.value})
//       </Link>{' '}
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default Sensor;

import React, { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { fetchSensors } from '../actions/sensors';
import SensorDetail from "./SensorDetail";
import AddDevice from "./AddDevice";
import "./deviceList.scss";

import * as mqtt from "precompiled-mqtt";

//setup mqtt
const host = "127.0.0.1";
const port = 9001;
const clientId = `clientId-YSBEeJJPv1`;
const connectUrl = `ws://${host}:${port}`;
const topic = "sensor";

// create a client
const client = mqtt.connect(connectUrl, {
  clientId,
  username: "lamntk",
  password: "123",
}); // create a client

client.on("connect", function () {
  client.subscribe("sensor", function (err) {
    if (!err) {
      console.log("Connected");
    }
  });
});

function SensorList() {
  const dispatch = useDispatch();
  // const sensors = useSelector((state) => state.sensors);
  const [isShowAddForm, setShowAddForm] = useState(false);
  const initSensor = [
    {
      keyCode: 1,
      name: "sensor1",
      statusId: 1,
    },
    {
      keyCode: 2,
      name: "sensor2",
      statusId: 0,
    },
  ];
  const sensors = useSelector((state) => state.sensors) || initSensor;

  const handleSendData = (payload) => {
    client.publish(topic, JSON.stringify(payload));
  };

  // useEffect(() => {
  //   dispatch(fetchSensors());
  // }, [dispatch]);

  return (
    <><div className="container">
      <Container fluid>
        <Row>
          <Col>Title</Col>
          <Col>Add Device</Col>
        </Row>
        <Row>
          Table
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
      {/* <ul>
      {sensors.map(sensor => (
        <li key={sensor.id}>{`${sensor.name}: ${sensor.value}`}</li>
=======
  <div className="sensorList-background">
    <div className="sensorList-container">
      {/* <h2>Sensor</h2> */}
      {sensors.map((sensor) => (
        <SensorDetail
          key={sensor.keyCode}
          handleSendData={handleSendData}
          {...sensor} />
      ))}
      <div className="add-sensor">
        <div
          className="button-background"
          onClick={() => {
            setShowAddForm(true);
          } }
        >
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>
    </div><div className="sensorList-add-form">
        <AddDevice
          isShowAddForm={isShowAddForm}
          setShowAddForm={setShowAddForm} />
      </div></>
  );
}

export default SensorList;
