// import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../constants/actionTypes';

// export const loginSuccess = (user) => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: user
//   };
// };

// export const loginFailure = (error) => {
//   return {
//     type: LOGIN_FAILURE,
//     payload: error
//   };
// };

// export const logout = () => {
//   return {
//     type: LOGOUT
//   };
// };

// import api from '../utils/api';
// import { setToken, clearToken } from '../utils/token';

// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// export const LOGOUT = 'LOGOUT';

// export function login(username, password) {
//   return async dispatch => {
//     try {
//       const response = await api.post('/login', { username, password });
//       setToken(response.data.token);
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: { username: response.data.username }
//       });
//     } catch (error) {
//       dispatch({
//         type: LOGIN_FAILURE,
//         error: error.response.data.error
//       });
//     }
//   };
// }

// export function logout() {
//   clearToken();
//   return { type: LOGOUT };
// }

// export const authenticate = () => {
//   return async (dispatch) => {
//     try {
//       // Make a request to the server to check if the user is authenticated
//       const response = await fetch('/api/authenticate');
//       const data = await response.json();

//       if (data.authenticated) {
//         // If the user is authenticated, dispatch the AUTHENTICATE_SUCCESS action with the user data
//         dispatch({ type: 'AUTHENTICATE_SUCCESS', payload: data.user });
//       } else {
//         // If the user is not authenticated, dispatch the AUTHENTICATE_FAILURE action
//         dispatch({ type: 'AUTHENTICATE_FAILURE' });
//       }
//     } catch (error) {
//       // If there's an error, dispatch the AUTHENTICATE_FAILURE action with the error message
//       dispatch({ type: 'AUTHENTICATE_FAILURE', payload: error.message });
//     }
//   };
// };

// Action Types
import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types'

// export const auth = (auth) => {
//   dispatch()
// }

// Action Creators
export const authenticate = () => {
  return async (dispatch) => {
    dispatch({ type: AUTHENTICATE_REQUEST });

    try {
      // Make a request to the server to check if the user is authenticated
      const response = await fetch("/api/authenticate");
      const data = await response.json();

      if (data.authenticated) {
        // If the user is authenticated, dispatch the AUTHENTICATE_SUCCESS action with the user data
        dispatch({ type: AUTHENTICATE_SUCCESS, payload: data.user });
      } else {
        // If the user is not authenticated, dispatch the AUTHENTICATE_FAILURE action
        dispatch({ type: AUTHENTICATE_FAILURE });
      }
    } catch (error) {
      // If there's an error, dispatch the AUTHENTICATE_FAILURE action with the error message
      dispatch({ type: AUTHENTICATE_FAILURE, payload: error.message });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      // Make a request to the server to login the user
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // If the login is successful, dispatch the LOGIN_SUCCESS action with the user data
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      } else {
        // If the login fails, dispatch the LOGIN_FAILURE action with the error message
        const data = await response.json();
        dispatch({ type: LOGIN_FAILURE, payload: data.message });
      }
    } catch (error) {
      // If there's an error, dispatch the LOGIN_FAILURE action with the error message
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    // Make a request to the server to logout the user
    await fetch("/api/logout");
    // Dispatch the LOGOUT action to clear the user data from the state
    dispatch({ type: LOGOUT });
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      // Make a request to the server to register the user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // If the registration is successful, dispatch the REGISTER_SUCCESS action with the user data
        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
      } else {
        // If the registration fails, dispatch the REGISTER_FAILURE action with the error message
        const data = await response.json();
        dispatch({ type: REGISTER_FAILURE, payload: data.message });
      }
    } catch (error) {
      // If there's an error, dispatch the REGISTER_FAILURE action with the error message
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
  };
};
