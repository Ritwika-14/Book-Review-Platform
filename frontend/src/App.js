import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {
    return (
        <Router>
            <Navbar />
            <main style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<BookListPage />} />
                    <Route path="/books/:id" element={<BookDetailPage />} />
                    <Route path="/add-book" element={<AddBookPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </main>
        </Router>
    );
}
export default App;