// import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from '../actions/types';

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: localStorage.getItem('token')
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case AUTH_REQUEST:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         token: null
//       };
//     case AUTH_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//         token: action.payload.token
//       };
//     case AUTH_FAILURE:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         token: null
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         token: null
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;


// import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/auth';

// const initialState = {
//   isLoggedIn: false,
//   username: null,
//   error: null
// };

// export default function authReducer(state = initialState, action) {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: true,
//         username: action.payload.username,
//         error: null
//       };
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         isLoggedIn: false,
//         error: action.error
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         isLoggedIn: false,
//         username: null,
//         error: null
//       };
//     default:
//       return state;
//   }
// }

import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions/types';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case AUTHENTICATE_FAILURE:
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
