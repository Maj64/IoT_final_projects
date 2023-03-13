import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { fetchSensors } from '../actions/sensors';
import SensorDetail from "./SensorDetail";
import AddDevice from "./AddDevice";
import "./deviceList.scss";

import * as mqtt from "precompiled-mqtt";
import { getSensor } from "../../service/api";
import TableComponent from "../Common/Table";
import { error as errorToast, success } from "../Common/Toast";
import FormComponent from "../Common/Form";

//setup mqtt
const host = "127.0.0.1";
const port = 9001;
const clientId = `clientId-YSBEeJJPv1`;
const connectUrl = `ws://${host}:${port}`;
const topic = "sensor";

// create a client
// const client = mqtt.connect(connectUrl, {
//   clientId,
//   username: "lamntk",
//   password: "123",
// }); // create a client

// client.on("connect", function () {
//   client.subscribe("sensor", function (err) {
//     if (!err) {
//       console.log("Connected");
//     }
//   });
// });

const formInputs = [
  { name: "Name", field: "name", type: "text" },
  { name: "Key Code", field: "keyCode", type: "text" },
  { name: "Status", field: "status", type: "text" },
  { name: "User", field: "userId", type: "text" },
];

const columns = [
  { name: "ID", field: "id" },
  { name: "Key Code", field: "keyCode" },
  { name: "Name", field: "name" },
  { name: "Status", field: "statusId" },
  { name: "User", field: "userId" },
];

function SensorList() {
  const dispatch = useDispatch();
  // const sensors = useSelector((state) => state.sensors);
  const [showList, setShowList] = useState(false);
  const [changeMode, setChangeMode] = useState(true);
  const [selectedItem, setSelectedItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isShowAddForm, setShowAddForm] = useState(false);
  const [titleForm, setTitleForm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

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
  const [sensorList, setSensorList] = useState([]);

  const fetchData = async () => {
    try {
      const id = "all";
      const response = await getSensor(id);
      const data = response.data;
      const arrayOfObjects = Object.values(data);
      const newSensorList = [...arrayOfObjects];
      setSensorList(newSensorList);
    } catch (error) {
      errorToast(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = (event) => {
    // setTitleForm('Add Device');
    // setSelectedItem({});
    // setShowModal(true);
    event.preventDefault();
    const newId = sensorList.length + 1;
    const newRow = {
      id: newId,
      name: event.target.name.value,
      age: parseInt(event.target.age.value),
      email: event.target.email.value,
    };
    setSensorList([...sensorList, newRow]);
    setShowAddModal(false);
  };

  const handleEditItem = (event) => {
    // setSelectedItem(item);
    // setShowModal(true);
    event.preventDefault();
    const updatedRow = {
      id: selectedRow.id,
      name: event.target.name.value,
      age: parseInt(event.target.age.value),
      email: event.target.email.value,
    };
    const newData = sensorList.map((row) => {
      if (row.id === selectedRow.id) {
        return updatedRow;
      } else {
        return row;
      }
    });
    setSensorList(newData);
    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitForm = (formData) => {
    // Handle the form submission and update the tableData if necessary
    console.log(formData);
    setShowModal(false);
  };

  const handleChangeMode = () => {
    setChangeMode(!changeMode);
  };

  return (
    <>
      <button onClick={handleChangeMode}>Change Mode</button>
      {changeMode ? (
        <TableComponent
          titleTable={"Device List"}
          dataSource={sensorList}
          columns={columns}
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
        />
      ) : (
        <div className="sensorList-background">
          <div className="sensorList-container">
            {/* <h2>Sensor</h2> */}
            {sensors.map((sensor) => (
              <SensorDetail
                key={sensor.keyCode}
                // handleSendData={handleSendData}
                {...sensor}
              />
            ))}
            <div className="add-sensor">
              <div
                className="button-background"
                onClick={() => {
                  setShowAddForm(true);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>
          <div className="sensorList-add-form">
            <AddDevice
              isShowAddForm={isShowAddForm}
              setShowAddForm={setShowAddForm}
            />
          </div>
        </div>
      )}

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
          <Form onSubmit={handleAddItem}>
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
          <Form onSubmit={handleEditItem}>
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
}

export default SensorList;
