import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#eee' }}>
            <div>
                <Link to="/" style={{ marginRight: '1rem' }}>Book List Page</Link>
                <Link to="/add-book" style={{ marginRight: '1rem' }}>Add Book</Link>
            </div>
            <div>
                {token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
