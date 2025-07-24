import axios from 'axios';

// Create an Axios instance with a base URL for your backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches your backend's URL
});

// Interceptor to add the token to every request if the user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- AUTH ---
export const login = (formData) => API.post('/auth/login', formData);
export const signup = (formData) => API.post('/auth/signup', formData);


// --- BOOKS ---
export const getBooks = (params) => API.get('/books', { params }); // Pass query params for filtering/pagination
export const getBookById = (id) => API.get(`/books/${id}`);
export const addBook = (bookData) => API.post('/books', bookData);

// --- REVIEWS ---
export const addReview = (bookId, reviewData) => API.post(`/reviews/${bookId}`, reviewData);