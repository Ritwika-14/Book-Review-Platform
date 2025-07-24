import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../api';

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 1. Add state for our filter inputs
    const [authorFilter, setAuthorFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');

    // 2. Wrap the fetching logic in a useCallback hook so we can call it easily
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            // Create a params object with only the filters that have values
            const params = {};
            if (authorFilter) params.author = authorFilter;
            if (genreFilter) params.genre = genreFilter;

            const { data } = await getBooks(params); // Pass the params to the API call
            setBooks(data.books);
        } catch (err) {
            setError('Failed to fetch books');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [authorFilter, genreFilter]); // Re-create this function if filters change

    // 3. Initial fetch when the component loads
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]); // The dependency array ensures it runs when fetchBooks is updated

    // 4. A handler for the filter form submission
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchBooks(); // Simply call our fetch function again
    };

    if (loading) return <p>Loading books...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

   return (
    <div>
        <h2>All Books</h2>

        {/* Filter Form */}
        <form onSubmit={handleFilterSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
            <input
                type="text"
                placeholder="Filter by author..."
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filter by genre..."
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
            />
            <button type="submit">Filter</button>
        </form>

        {/* Book Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {!loading && books.length > 0 ? books.map((book) => (
                <div
                    key={book._id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <h3><Link to={`/books/${book._id}`}>{book.title}</Link></h3>
                        <p>by {book.author}</p>
                        <p>Genre: {book.genre}</p>
                    </div>
                    <div>
                        <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
                            Rating: {book.averageRating.toFixed(1)} / 5
                        </p>
                        <Link
                            to={`/books/${book._id}`}
                            style={{ display: 'block', marginTop: '0.5rem', fontWeight: 'bold' }}
                        >
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