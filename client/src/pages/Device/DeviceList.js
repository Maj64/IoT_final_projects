import React, { useState, useEffect } from "react";
import Toggle from "react-bootstrap-toggle";
import { useDispatch, useSelector } from "react-redux";

import * as mqtt from "precompiled-mqtt";
import TableComponent from "../../components/Common/Table";
import FormComponent from "../../components/Common/Form";
import { error as errorToast, success as successToast } from "../../components/Common/Toast";
import { generateString, randomInteger } from "../../utils";
import { getSensors, addSensor, deleteSensor, updateSensor } from "../../services/sensor";
import { storeSensorList } from "../../store/actions/sensorSlice";

// setup mqtt
const protocol = "wss";
const host = "2e40b1502386486aa13fa1bf324ee13b.s2.eu.hivemq.cloud";
const port = 8884;
const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
const connectUrl = `${protocol}://${host}:${port}/mqtt`;
const topic = "sensor";

// create a client
const client = mqtt.connect(connectUrl, {
  clientId,
  username: "myrindavermouth",
  password: "nW4@W@LVkJ2ie33",
});

client.on("connect", function () {
  client.subscribe("sensor", function (err) {
    if (!err) {
      console.log("Connected");
    }
  });
});

function SensorList() {
  const dispatch = useDispatch();

  // Table Data
  const [columnList, setColumList] = useState([
    { name: "ID", field: "id" },
    { name: "Key Code", field: "keyCode" },
    { name: "Name", field: "name" },
    { name: "Status", field: "statusId" },
    { name: "User", field: "userId" },
  ]);
  const [sensorList, setSensorList] = useState([]);
  // Form data
  const [sensor, setSensor] = useState({});
  const [modalData, setModalData] = useState({
    title: "",
    visible: false,
  });
  const [formInputList, setFormInputList] = useState([]);

  // check add or edit 
  const [typeAction, setTypeAction] = useState('')
  const [data, setData] = useState({})
  // const sensors = useSelector((state) => state.sensors);

  const fetchData = async () => {
    try {
      const id = "all";
      const response = await getSensors(id);
      const data = response.data;
      const arrayOfObjects = Object.values(data);
      const newSensorList = [...arrayOfObjects];
      console.log(newSensorList);
      dispatch(storeSensorList(newSensorList))
      setSensorList(newSensorList);
    } catch (error) {
      errorToast(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const handleAdd = () => {
    setTypeAction('add')
    setSensor({});
    setFormInputList([
      { name: "Name", field: "name", type: "text" },
      { name: "User", field: "userId", type: "text" },
    ]);
    setModalData({
      visible: true,
      title: "Add Sensor",
    });
  };

  const handleEdit = (sensor) => {
    setTypeAction('edit')
    setSensor({
      name: sensor.name
    })
    setFormInputList([
      { name: "Name", field: "name", type: "text" },
    ]);

    setModalData({
      visible: true,
      title: "Edit Sensor",
    });
  };

  const handleCloseModal = () => {
    setModalData({
      visible: false,
      title: "",
    });
    setSensor({});
    setTypeAction('')
  };

  const addItem = async (sensor) => {
    const sensorData = {
      ...sensor,
      keyCode: generateString(6),
      name: sensor.name,
      statusId: "false",
      userId: sensor.userId
    }

    try {
      const { data } = await addSensor(sensorData)
      setData(data)
      successToast(data.errMessage)
    } catch (error) {
      errorToast(error.message);
    }
  }

  const updateItem = async (sensor) => {
    const sensorData = {
      id: sensor.id,
      name: sensor.name,
      statusId: sensor.statusId
    }

    try {
      const { data } = await updateSensor(sensorData)
      setData(data)
      successToast(data.errMessage)
    } catch (error) {
      errorToast(error.message);
    }
  }

  const handleSubmitForm = (formData) => {
    switch (typeAction) {
      case 'add':
        addItem(formData)
        break;
      case 'edit': 
        updateItem(formData)
        break;
      default:
        break;
    }
    setTypeAction('')
    setSensor({});
    setModalData({
      visible: false,
      title: "",
    });
  };

  const handleDelete = async (sensor) => {
    try {
      const { data } = await deleteSensor({ id: sensor.id })
      setData(data)
      successToast(data.errMessage)
    } catch (error) {
      errorToast(error.message);
    }
  };

  let timerId

  const handleTurnOnMqtt = (data) => {
    timerId = setInterval(() => {
      const payload = {
        keyCode: data.keyCode,
        temperature: randomInteger(7, 29),
        acidity: randomInteger(0, 7),
        chlorine: randomInteger(1, 16),
        oxygen: randomInteger(140, 200),
        pH: randomInteger(6, 9),
      };
      client.publish(topic, JSON.stringify(payload));
    }, 1000)
  };

  

  const handleToggle = async (formData) => {
    const sensorData = {
      id: formData.id.toString(),
      statusId: formData.statusId.toString(),
      name: formData.name
    }

    try {
      const { data } = await updateSensor(sensorData)
      setData({...data, formData})
      successToast(data.errMessage)
    } catch (error) {
      errorToast(error.message);
    }
    console.log(formData.statusId);
    // handleTurnOnMqtt(formData)
    if (formData.statusId) { 
      handleTurnOnMqtt(formData)
    } else {
      clearInterval(timerId)
      client.end();
    }
  };

  return (
    <>
      <TableComponent
        titleTable={"Device List"}
        dataSource={sensorList}
        columns={columnList}
        onAddItem={handleAdd}
        onEditItem={handleEdit}
        onDeleteItem={handleDelete}
        onToggle={handleToggle}
      />

      <FormComponent
        modalData={modalData}
        dataForm={sensor}
        formInputList={formInputList}
        onSubmitForm={handleSubmitForm}
        onCloseModal={handleCloseModal}
      />
    </>
  );
}

export default SensorList;
