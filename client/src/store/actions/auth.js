// import { authenticateUser } from '../api/authApi';
// import {
//   AUTH_REQUEST,
//   AUTH_SUCCESS,
//   AUTH_FAILURE,
// } from '../constants/authConstants';

// // Action creator to authenticate user
// export const authenticate = (credentials) => async (dispatch) => {
//   dispatch({ type: AUTH_REQUEST });

//   try {
//     // Call authentication API and get JWT token
//     const token = await authenticateUser(credentials);

//     // Save token to localStorage
//     localStorage.setItem('token', token);

//     // Dispatch success action with token
//     dispatch({ type: AUTH_SUCCESS, payload: token });
//   } catch (err) {
//     // Dispatch failure action with error message
//     dispatch({ type: AUTH_FAILURE, payload: err.message });
//   }
// };
