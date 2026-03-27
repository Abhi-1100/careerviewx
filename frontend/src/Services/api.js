import axios from 'axios';
import { getToken } from '../utils/auth';

const normalizeApiBaseUrl = (url) => {
  const cleanedUrl = (url || '').trim().replace(/\/+$/, '');
  if (!cleanedUrl) return 'https://careerviewx.onrender.com/api';
  return cleanedUrl.endsWith('/api') ? cleanedUrl : `${cleanedUrl}/api`;
};

// Create axios instance with base URL
const API = axios.create({
  baseURL: normalizeApiBaseUrl(process.env.REACT_APP_API_URL)
});

// Add token to every request automatically
API.interceptors.request.use((config) => {
  const token = getToken(); // Use our storage abstraction
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const signup = (userData) => API.post('/auth/signup', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const logout = () => API.post('/auth/logout');
export const googleSignin = (userData) => API.post('/auth/google-signin', userData);
export const updateProfile = (profileData) =>
  API.put('/auth/profile/update', profileData);

// Email Verification
export const verifyEmail = (token) =>
  API.post('/auth/verify-email', { token });
export const resendVerificationEmail = (email) =>
  API.post('/auth/resend-verification', { email });

// Password Reset
export const forgotPassword = (email) =>
  API.post('/auth/forgot-password', { email });
export const resetPassword = (token, password, passwordConfirm) =>
  API.post('/auth/reset-password', { token, password, passwordConfirm });

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
export const searchCareers = (query) =>
  API.get(`/careers/search?q=${encodeURIComponent(query)}`);
export const getCareerById = (id) =>
  API.get(`/careers/detail/${id}`);
export const getAllCareers = () =>
  API.get('/careers');

export default API;
