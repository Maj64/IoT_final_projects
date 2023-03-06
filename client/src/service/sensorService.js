import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/sensors';

// Function to get list of sensors
export const getSensorList = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get sensor detail
export const getSensorDetail = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to create a new sensor
export const createSensor = async (sensorData) => {
  try {
    const response = await axios.post(baseUrl, sensorData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to update an existing sensor
export const updateSensor = async (id, sensorData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, sensorData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to delete a sensor
export const deleteSensor = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
