import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../api';

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {};
            if (authorFilter) params.author = authorFilter;
            if (genreFilter) params.genre = genreFilter;

            const { data } = await getBooks(params);
            setBooks(data.books);
        } catch (err) {
            setError('Failed to fetch books');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [authorFilter, genreFilter]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchBooks();
    };

    if (loading) return <p className="text-center text-lg font-medium mt-10 text-gray-600">Loading books...</p>;
    if (error) return <p className="text-center text-red-600 font-semibold mt-10">{error}</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Books</h2>

            {/* Filter Form */}
            <form
                onSubmit={handleFilterSubmit}
                className="flex flex-col md:flex-row justify-center gap-4 mb-10"
            >
                <input
                    type="text"
                    placeholder="Filter by author..."
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3"
                />
                <input
                    type="text"
                    placeholder="Filter by genre..."
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition w-full md:w-auto"
                >
                    Filter
                </button>
            </form>

            {/* Book Cards */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {!loading && books.length > 0 ? (
                    books.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white shadow-md hover:shadow-lg transition rounded-lg p-6 flex flex-col justify-between h-full"
                        >
                            <div>
                                <h3 className="text-xl font-bold text-blue-900 hover:underline mb-2">
                                    <Link to={`/books/${book._id}`}>{book.title}</Link>
                                </h3>
                                <p className="text-gray-600">by <span className="font-medium">{book.author}</span></p>
                                <p className="text-sm text-gray-500 mt-1">Genre: {book.genre}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-700">
                                    Rating: {book.averageRating.toFixed(1)} / 5
                                </p>
                                <Link
                                    to={`/books/${book._id}`}
                                    className="mt-2 inline-block text-sm text-blue-600 font-medium hover:underline"
                                >
                                    View Details & Write a Review
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-center text-gray-500 col-span-full">No books found with the current filters.</p>
                )}
            </div>
        </div>
    );
};

export default BookListPage;
