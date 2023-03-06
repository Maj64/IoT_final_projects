import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SensorPage = () => {
  const { id } = useParams();
  const sensor = useSelector((state) => state.sensors.find((sensor) => sensor.id === parseInt(id)));

  if (!sensor) {
    return <div>Sensor not found</div>;
  }

  return (
    <div>
      <h1>{sensor.name}</h1>
      <p>Location: {sensor.location}</p>
      <p>Value: {sensor.value}</p>
    </div>
  );
};

export default SensorPage;
