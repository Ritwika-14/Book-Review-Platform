import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as apiSignup } from '../api'; // Renamed to avoid conflict

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // This is the successful API call. We don't need to use the response data.
      await apiSignup({ username, password });

      // On success, show an alert and redirect to the login page.
      alert('Signup successful! Please log in to continue.');
      navigate('/login');

    } catch (err) {
      // This will now correctly catch REAL errors, like "User already exists".
      setError(err.response?.data?.msg || 'Failed to signup');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;