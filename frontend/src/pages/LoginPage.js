import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { login as apiLogin } from '../api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await apiLogin({ username, password });
      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to login');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex  justify-center bg-gray-100 px-4">
      <div className="bg-slate-100 shadow-lg mt-10 rounded-lg p-8 w-[350px] h-[500px]">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          <Link to="/signup" className="ml-10">
  <p className="ml-8 underline text-blue-600 hover:text-blue-800">Don't have an account? Sign up</p>
</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
