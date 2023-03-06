import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/users';

// Function to get list of users
export const getUserList = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get user detail
export const getUserDetail = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(baseUrl, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to update an existing user
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to check if user has permission for a given role
export const hasPermission = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};
