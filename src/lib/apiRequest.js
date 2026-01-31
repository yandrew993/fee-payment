import axios from "axios";

// Use environment variable or fallback to localhost development server
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const apiRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add response interceptor to handle errors gracefully
apiRequest.interceptors.response.use(
  response => response,
  error => {
    // Don't log validation errors (400) or errors from empty/invalid URLs
    const status = error.response?.status;
    const url = error.config?.url;
    
    if (status !== 400 && status !== 404 && url && url.trim() !== '' && !url.includes("undefined")) {
      console.error(`API Error (${status || 'Unknown'}): ${url}`);
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
