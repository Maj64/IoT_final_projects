// // import { ADD_SENSOR, EDIT_SENSOR, DELETE_SENSOR, FETCH_SENSORS } from './types';

// // export const addSensor = (sensor) => {
// //   return {
// //     type: ADD_SENSOR,
// //     payload: sensor
// //   };
// // };

// // export const editSensor = (id, updates) => {
// //   return {
// //     type: EDIT_SENSOR,
// //     payload: {
// //       id,
// //       updates
// //     }
// //   };
// // };

// // export const deleteSensor = (id) => {
// //   return {
// //     type: DELETE_SENSOR,
// //     payload: id
// //   };
// // };

// // export const fetchSensors = (sensors) => {
// //   return {
// //     type: FETCH_SENSORS,
// //     payload: sensors
// //   };
// // };

// import { createClient } from 'mqtt';
// import {
//   FETCH_SENSORS_REQUEST,
//   FETCH_SENSORS_SUCCESS,
//   FETCH_SENSORS_FAILURE,
// } from '../constants/sensorConstants';

// // Action creator to fetch sensors
// export const fetchSensors = () => (dispatch) => {
//   dispatch({ type: FETCH_SENSORS_REQUEST });

//   // Create MQTT client and subscribe to sensor data topic
//   const client = createClient('ws://localhost:9001');
//   client.on('connect', () => {
//     client.subscribe('/sensors');
//   });

//   // Listen for sensor data and update store
//   client.on('message', (_, message) => {
//     const sensors = JSON.parse(message.toString());
//     dispatch({ type: FETCH_SENSORS_SUCCESS, payload: sensors });
//   });

//   // Handle MQTT errors
//   client.on('error', (err) => {
//     dispatch({ type: FETCH_SENSORS_FAILURE, payload: err.message });
//   });
// };
