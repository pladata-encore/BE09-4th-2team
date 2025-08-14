// src/lib/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/blog-service', // 직접 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
  console.log('보내는 토큰:', localStorage.getItem('accessToken'));
});

export default api;
