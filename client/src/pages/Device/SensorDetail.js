import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./sensorDetail.scss";

function SensorPage(props) {
  const { keyCode, name, statusId, handleSendData } = props;
  const [isSendData, setSendData] = useState(false);

  useEffect(() => {
    const sendData = () => {
      const payload = {
        keyCode: "sensor-cong-vien",
        temperature: 32,
        acidity: 1,
        chlorine: 5,
        oxygen: 35,
        pH: 4.0,
      };
      handleSendData(payload);
    };

    let sendDataController = setInterval(() => isSendData && sendData(), 2000);

    return () => {
      clearInterval(sendDataController);
    };
  }, [isSendData, handleSendData]);

  return (
    <div className="sensor-container">
      {/* <h1>{sensor.name}</h1>
      <p>Location: {sensor.location}</p>
      <p>Value: {sensor.value}</p> */}
      <div className="sensor-title">{name}</div>
      <div className="sensor-description">{keyCode}</div>
      <div className="sensor-description">{statusId}</div>
      <div className="switch-container">
        <div>
          <label className="switch">
            <input
              type="checkbox"
              checked={isSendData}
              onClick={() => setSendData(!isSendData)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SensorPage;
