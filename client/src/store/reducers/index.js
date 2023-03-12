import { combineReducers } from 'redux';
import authReducer from './authReducer';
// import sensorReducer from './sensors';

const rootReducer = combineReducers({
  auth: authReducer,
  // sensors: sensorReducer
});

export default rootReducer;
