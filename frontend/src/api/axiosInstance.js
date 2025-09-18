import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // use env variable
});

axiosInstance.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token');
  //if (token) config.headers.Authorization = `Bearer ${token}`;
  const auth = localStorage.getItem("auth");
  if (auth) {
    const { token } = JSON.parse(auth);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
