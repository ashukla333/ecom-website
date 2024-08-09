import axios from 'axios';
import { AuthToken } from './list';

// Create an Axios instance with the base URL from environment variables
const api = axios.create({
  baseURL: "http://localhost:5000", // Corrected typo from 'SEVER' to 'SERVER'
  withCredentials: true,
});

// Add a request interceptor to include the Authorization header if the token exists
api.interceptors.request.use(
  (req) => {
    // Get the access token from localStorage
    const accessToken = AuthToken;
    if (accessToken?.AuthToken) {
      // Include the Authorization header
      req.headers.Authorization = `Bearer ${accessToken?.AuthToken}`;
    }
    return req;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default api;
