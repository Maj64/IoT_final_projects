import React, { useState } from "react";
import TableComponent from "../Common/Table";

const SensorList = () => {
  const [sensorList, setData] = useState([
    {
      id: 1,
      name: "Temperature",
      location: "Kitchen",
      device_id: "IoTDevice1",
      created_at: "2022-01-01 10:00:00",
    },
    {
      id: 2,
      name: "Temperature",
      location: "Kitchen",
      device_id: "IoTDevice1",
      created_at: "2022-01-01 10:00:00",
    },
    {
      id: 3,
      name: "Temperature",
      location: "Kitchen",
      device_id: "IoTDevice1",
      created_at: "2022-01-01 10:00:00",
    },
    {
      id: 4,
      name: "Temperature",
      location: "Kitchen",
      device_id: "IoTDevice1",
      created_at: "2022-01-01 10:00:00",
    },
  ]);
  const columns = [
    { name: "ID", field: "id" },
    { name: "Name", field: "name" },
    { name: "Location", field: "location" },
    { name: "Device", field: "device_id" },
    { name: "Created Date", field: "created_at" },
  ];
  return (
    <div>
      <TableComponent
        titleTable={"Sensor List"}
        dataSource={sensorList}
        columns={columns}
      />
    </div>
  );
};

export default SensorList;
