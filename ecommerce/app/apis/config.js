import axios from "axios";

const api = axios.create({
  baseURL: "https://kigsvillah-backend.vercel.app",
  withCredentials: true,
});

api.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("AuthToken");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
