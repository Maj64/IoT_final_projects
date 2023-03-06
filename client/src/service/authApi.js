// import axios from 'axios';

// // Function to authenticate user and get JWT token
// export const authenticateUser = async (credentials) => {
//   try {
//     // Call authentication API with user credentials
//     const response = await axios.post('/api/authenticate', credentials);

//     // Return JWT token from response
//     return response.data.token;
//   } catch (err) {
//     // Throw error if authentication fails
//     throw new Error(err.response.data.message);
//   }
// };


import axios from 'axios';

// Function to authenticate user and get JWT token
export const authenticateUser = async (credentials) => {
  try {
    // Call authentication API with user credentials
    const response = await axios.post('/api/authenticate', credentials);

    // Return JWT token from response
    return response.data.token;
  } catch (err) {
    // Throw error if authentication fails
    throw new Error(err.response.data.message);
  }
};

// Function to get authenticated user's profile
export const getUserProfile = async () => {
  try {
    // Get JWT token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found, please log in again');
    }

    // Set Authorization header with JWT token
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    // Call user profile API with JWT token
    const response = await axios.get('/api/profile');

    // Return user profile from response
    return response.data;
  } catch (err) {
    // Throw error if profile retrieval fails
    throw new Error(err.response.data.message);
  }
};

// Function to log out user and remove JWT token from localStorage
export const logoutUser = () => {
  // Remove JWT token from localStorage
  localStorage.removeItem('token');

  // Remove Authorization header from axios default headers
  delete axios.defaults.headers.common.Authorization;
};
