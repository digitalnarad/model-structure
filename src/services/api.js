import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // flip to true if you need cookies
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or Context, Redux, etc.
    if (token) config.headers.Authorization = `Bearer ${token ? token : ""}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Example: auto-logout on 401
    if (error.response?.status === 401) {
      // dispatch(logout()) or navigate("/login"), etc.
    }
    return Promise.reject(error);
  }
);

const get = (url, params = {}, config = {}) =>
  api.get(url, { params, ...config });
const post = (url, data = {}, config = {}) => api.post(url, data, config);
const put = (url, data = {}, config = {}) => api.put(url, data, config);
const del = (url, config = {}) => api.delete(url, config);

export default { get, post, put, delete: del };
