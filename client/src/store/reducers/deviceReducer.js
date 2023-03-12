// import { ADD_SENSOR, UPDATE_SENSOR, DELETE_SENSOR } from './actions';

// const initialState = {
//   sensors: []
// };

// function deviceReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_SENSOR:
//       return {
//         ...state,
//         sensors: [...state.sensors, action.sensor]
//       };
//     case UPDATE_SENSOR:
//       return {
//         ...state,
//         sensors: state.sensors.map((sensor) =>
//           sensor.id === action.sensor.id ? action.sensor : sensor
//         )
//       };
//     case DELETE_SENSOR:
//       return {
//         ...state,
//         sensors: state.sensors.filter((sensor) => sensor.id !== action.sensorId)
//       };
//     default:
//       return state;
//   }
// }

// export default deviceReducer;

// import { FETCH_SENSORS_SUCCESS, ADD_SENSOR_SUCCESS, EDIT_SENSOR_SUCCESS, DELETE_SENSOR_SUCCESS } from '../actions/types';

// const initialState = [];

// const sensorReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_SENSORS_SUCCESS:
//       return action.payload;
//     case ADD_SENSOR_SUCCESS:
//       return [...state, action.payload];
//     case EDIT_SENSOR_SUCCESS:
//       return state.map((sensor) => (sensor.id === action.payload.id ? action.payload : sensor));
//     case DELETE_SENSOR_SUCCESS:
//       return state.filter((sensor) => sensor.id !== action.payload);
//     default:
//       return state;
//   }
// };

// export default sensorReducer;


const initialSensorState = {
  sensors: [],
  error: null,
};

function sensorReducer(state = initialSensorState, action) {
  switch (action.type) {
    case 'GET_SENSORS_SUCCESS':
      return {
        sensors: action.payload,
        error: null,
      };
    case 'GET_SENSORS_FAILURE':
      return {
        sensors: [],
        error: action.payload,
      };
    case 'ADD_SENSOR_SUCCESS':
      return {
        sensors: [...state.sensors, action.payload],
        error: null,
      };
    case 'ADD_SENSOR_FAILURE':
      return {
        sensors: state.sensors,
        error: action.payload,
      };
    default:
      return state;
  }
}