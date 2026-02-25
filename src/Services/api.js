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
export const updateProfile = (profileData) => 
  API.put('/auth/profile/update', profileData);

// Profile API calls (protected)
export const getProfile = () => API.get('/profile');
export const updateCareerSuggestions = (suggestions) => 
  API.put('/profile/career-suggestions', { careerSuggestions: suggestions });
export const addCareerPath = (careerPathData) => 
  API.post('/profile/career-path', careerPathData);
export const getCareerPaths = () => API.get('/profile/career-paths');

// Assessment API calls (protected)
export const getAssessmentQuestions = () => API.get('/assessment/questions');
export const submitAssessment = (answers) => 
  API.post('/assessment/submit', { answers });
export const getAssessmentHistory = () => API.get('/assessment/history');

// Career API calls (protected)
export const getCareerByName = (careerName) => 
  API.get(`/careers/${careerName}`);

export default API;
