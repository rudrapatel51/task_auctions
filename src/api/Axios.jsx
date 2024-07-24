import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-api.jpauction.in/api/v1', //baseURL
  headers: {
    'Content-Type': 'application/json',
  },
});

// request token to access the protected url
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor 
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
    
      console.error('Unauthorized access - please login again.');
    }
    return Promise.reject(error);
  }
);

export default api;
