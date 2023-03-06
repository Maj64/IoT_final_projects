import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT,
} from '../constants/authConstants';

const apiUrl = 'http://localhost:5000/api/auth';

// Action creator to authenticate user
export const authenticateUser = (credentials) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  try {
    const response = await axios.post(`${apiUrl}/login`, credentials);
    const { token } = response.data;

    // Set token in local storage
    localStorage.setItem('jwtToken', token);

    // Decode token to get user data
    const user = jwtDecode(token);

    dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (err) {
    dispatch({ type: AUTH_FAILURE, payload: err.response.data });
  }
};

// Action creator to logout user
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');

  dispatch({ type: LOGOUT });
};
