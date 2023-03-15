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

import * as mqtt from "precompiled-mqtt";
import { getSensor } from "../../service/api";
import TableComponent from "../Common/Table";
import FormComponent from "../Common/Form";
import { error as errorToast, success } from "../Common/Toast";

//setup mqtt
// const host = "127.0.0.1";
// const port = 9001;
// const clientId = `clientId-YSBEeJJPv1`;
// const connectUrl = `ws://${host}:${port}`;
// const topic = "sensor";

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

  // Table Data
  const [columnList, setColumList] = useState([
    { name: "ID", field: "id" },
    { name: "Key Code", field: "keyCode" },
    { name: "Name", field: "name" },
    { name: "Status", field: "statusId" },
    { name: "User", field: "userId" },
  ])
  const [sensorList, setSensorList] = useState([])
  const [selectedSensor, setSelectedSensor] = useState({})
  // Form data
  const [newSensor, setNewSensor] = useState({})
  const [modalData, setModalData] = useState({
    title: "",
    visible: false,
  })
  const [formInputList, setFormInputList] = useState([
    { name: "Name", field: "name", type: "text" },
    { name: "Key Code", field: "keyCode", type: "text" },
    { name: "Status", field: "statusId", type: "text" },
    { name: "User", field: "userId", type: "text" },
  ])
  // const sensors = useSelector((state) => state.sensors);

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

  const handleAdd = () => {
    setModalData({
      visible: true,
      title: 'Add Sensor'
    })
    setNewSensor({
      name: 'sensor',
      keyCode: 'sensor',
      status: 'sensor',
      userId: 'sensor1',
    })
    setSelectedSensor({})
  };

  const handleEdit = (sensor) => {
    setModalData({
      visible: true,
      title: 'Edit Sensor'
    })
    setSelectedSensor(sensor)
    // setSelectedItem(item);
    // setShowModal(true);
    // event.preventDefault();
    // const updatedRow = {
    //   id: selectedRow.id,
    //   name: event.target.name.value,
    //   age: parseInt(event.target.age.value),
    //   email: event.target.email.value,
    // };
    // const newData = sensorList.map((row) => {
    //   if (row.id === selectedRow.id) {
    //     return updatedRow;
    //   } else {
    //     return row;
    //   }
    // });
    // setSensorList(newData);
    // setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setNewSensor({})
    setModalData({
      visible: false,
      title: ''
    })
  };

  const handleSubmitForm = (formData) => {
    let updatedSensors;
    if (selectedSensor.id) {
      updatedSensors = sensorList.map((sensor) => {
        if (sensor.id === selectedSensor.id ) {
          return { ...sensor, ...formData}
        }
        return sensor;
      })
    } else {
      const newSensor = { id: Date.now(), ...formData }
      updatedSensors = [ ...sensorList, newSensor ]
    }
    setSensorList(updatedSensors);
    setNewSensor({})
    setModalData({
      visible: false,
      title: ''
    })
    // Handle the form submission and update the tableData if necessary
  };

  const handleDelete = (sensor) => {
    const updatedSensors = sensorList.filter((s) => s.id !== sensorList.id)
    setSensorList(updatedSensors)
  }

  return (
    <>
      <TableComponent
          titleTable={"Device List"}
          dataSource={sensorList}
          columns={columns}
          onAddItem={handleAdd}
          onEditItem={handleEdit}
          onDeleteItem={handleDelete}
        />

      <FormComponent
        modalData={modalData}
        dataForm={newSensor}
        formInputList={formInputList}
        onSubmitForm={handleSubmitForm}
        onCloseModal={handleCloseModal}
      />
    </>
  );
}

export default SensorList;
