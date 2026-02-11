import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const signup = (userData) => API.post('/auth/signup', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const logout = () => API.post('/auth/logout');

// Profile API calls (protected)
export const getProfile = () => API.get('/profile');
export const updateCareerSuggestions = (suggestions) => 
  API.put('/profile/career-suggestions', { careerSuggestions: suggestions });

export default API;
