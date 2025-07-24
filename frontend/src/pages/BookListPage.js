import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../api'; // We only need getBooks from the API service

const BookListPage = () => {
    // State for the list of books and UI (loading/error)
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State to hold the text the user types into the filter inputs
    const [authorFilter, setAuthorFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');

    // This useEffect runs only ONCE when the component mounts
    // to load the initial list of all books.
    useEffect(() => {
        setLoading(true);
        // Fetch all books with no filters when the page first loads
        getBooks()
            .then(response => {
                setBooks(response.data.books);
            })
            .catch(err => {
                setError('Failed to load books. Please try refreshing the page.');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // The empty [] array ensures this runs only once on mount.

    // This function is ONLY called when the form is submitted (i.e., the button is clicked)
    const handleFilterSubmit = (e) => {
        e.preventDefault(); // Prevent the browser from reloading
        setLoading(true);
        setError('');

        // Create a parameters object with the current values from the input fields
        const params = {};
        if (authorFilter) params.author = authorFilter;
        if (genreFilter) params.genre = genreFilter;

        // Call the API with the new filters
        getBooks(params)
            .then(response => {
                setBooks(response.data.books);
            })
            .catch(err => {
                setError('Failed to apply filters.');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // This handler clears the input fields and fetches the full list of books again
    const handleClearFilters = () => {
        setAuthorFilter('');
        setGenreFilter('');
        setLoading(true);
        // Fetch with no filters
        getBooks()
            .then(response => {
                setBooks(response.data.books);
            })
            .catch(err => {
                setError('Failed to clear filters.');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>All Books</h2>

            {/* The form's onSubmit event is what triggers the filtering */}
            <form onSubmit={handleFilterSubmit} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>

                {/* Simple text input for author */}
                <input
                    type="text"
                    placeholder="Filter by author..."
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                />

                {/* Simple text input for genre */}
                <input
                    type="text"
                    placeholder="Filter by genre..."
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                />

                <button type="submit">Filter</button>
                <button type="button" onClick={handleClearFilters}>Clear Filters</button>
            </form>

            {/* The rest of the page for displaying books */}
            {loading && <p>Loading books...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {!loading && books.length > 0 ? books.map((book) => (
                    <div key={book._id} style={{ border: '1px solid #ccc', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h3><Link to={`/books/${book._id}`}>{book.title}</Link></h3>
                            <p>Author: {book.author}</p>
                            <p>Genre: {book.genre}</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
                                Rating: {book.averageRating.toFixed(1)} / 5
                            </p>
                            <Link to={`/books/${book._id}`} style={{ display: 'block', marginTop: '0.5rem', fontWeight: 'bold' }}>
                                View Details & Write a Review
                            </Link>
                        </div>
                    </div>
                )) : !loading && <p>No books found with the current filters.</p>}
            </div>
        </div>
    );
};

export default BookListPage;