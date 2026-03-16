import axios from 'axios';
import axiosRetry from 'axios-retry';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(apiClient, { 
  retries: 3, 
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (error.response?.status ? error.response.status >= 500 : false) || error.code === 'ECONNABORTED' || error.message === 'Network Error';
  }
});

// Add a request interceptor to add the JWT token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
