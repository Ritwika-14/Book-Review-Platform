import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook as apiAddBook } from '../api';
import { AuthContext } from '../context/authContext';

const AddBookPage = () => {
  // Form state: holds the data the user types in
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  // UI state: for showing errors or loading indicators
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // **GOOD PRACTICE**: Protect the page on the frontend too.
  // If a user who is not logged in tries to access this page directly by URL,
  // we redirect them to the login page.
  useEffect(() => {
    if (!token) {
      alert('You must be logged in to add a book.');
      navigate('/login');
    }
  }, [token, navigate]);


  // This function runs when the user clicks the submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    setError('');
    setLoading(true);

    try {
      // The API call to your backend.
      // The Axios interceptor automatically adds the 'Authorization' header with the token.
      await apiAddBook({ title, author, genre });
      
      // If the API call is successful:
      alert('Book added successfully!');
      navigate('/'); // Redirect to the homepage

    } catch (err) {
      // If the API call fails:
      setError(err.response?.data?.msg || 'Failed to add book. Please try again.');
      console.error(err);
    } finally {
      // This runs whether the request succeeded or failed
      setLoading(false);
    }
  };

  // The JSX that renders the form
  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Display any error message from the backend */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Disable the button while the request is in progress */}
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;