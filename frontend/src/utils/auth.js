// Authentication utility functions

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Get current user from localStorage or sessionStorage
export const getCurrentUser = () => {
  // Try localStorage first (persistent), then sessionStorage (temporary)
  let userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

// Save user data to localStorage or sessionStorage based on rememberMe
export const saveUserData = (token, user, rememberMe = false) => {
  if (rememberMe) {
    // Persistent storage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('rememberMe', 'true');

    // Clear session storage to avoid conflicts
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  } else {
    // Temporary storage (clears when browser session ends)
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));

    // Clear localStorage to avoid conflicts
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
  }
};

// Clear user data from both localStorage and sessionStorage
export const clearUserData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('rememberMe');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

// Get token from localStorage or sessionStorage
export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

// Check if user was remembered (has persistent storage)
export const wasRemembered = () => {
  return localStorage.getItem('rememberMe') === 'true';
};
