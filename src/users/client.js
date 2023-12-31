import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
export const USERS_API = `${BASE_API}/api/users`;

export const signin = async (credentials) => {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  console.log(USERS_API);
  return response.data;
};
export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  console.log(response.data);
  return response.data;
};
export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const updateUserDetail = async (user) => {
  const response = await request.put(`${USERS_API}/profile/${user._id}`, user);
  return response.data;
};


export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};

export const findAllUSERUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};
export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUserByUsername = async (username) => {
  const response = await request.get(`${USERS_API}/profile/${username}`);
  return response.data;
};

export const deleteUser = async (user) => {
  const response = await request.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};
export const signup = async (credentials) => {
  const response = await request.post(
    `${USERS_API}/signup`, credentials);
  return response.data;
};
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};

export const addFollowing = async (usernameToFollow, currentUserName) => {
  try {
    const response = await request.put(`${USERS_API}/profile/addFollowing/${usernameToFollow}/${currentUserName}`);
    return response.data; // You can return data received from the server if needed
  } catch (error) {
    throw error; // Handle errors or return a default value based on your requirements
  }
};

export const removeFollowing = async (usernameToRemove, currentUserName) => {
  try {
    const response = await request.put(`${USERS_API}/profile/removeFollowing/${usernameToRemove}/${currentUserName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};







