import React, { useState } from 'react';
import axios from 'axios';
import '../Style/search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const handleSearch = async () => {
        setLoading(true);
        setResults([]); // Clear previous results

        try {
            // Fetch users
            const userResponse = await axios.get('http://localhost:3000/api/users');
            const users = userResponse.data; // Axios automatically parses JSON

            // Fetch courses
            const courseResponse = await axios.get('http://localhost:3000/api/courses');
            const courses = courseResponse.data; // Axios automatically parses JSON

            // Combine both results
            const combinedResults = [
                ...users.map(user => ({ ...user, type: 'User' })),
                ...courses.map(course => ({ ...course, type: 'Course' }))
            ];

            // Filter the combined results based on the query
            const filteredResults = combinedResults.filter(item =>
                item.name?.toLowerCase().includes(query.toLowerCase()) || // Adjust based on your data structure
                item.title?.toLowerCase().includes(query.toLowerCase()) // Assuming courses have a title field
            );

            setResults(filteredResults);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResults([]); // Clear results on error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search for students or courses..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}

            {results.length > 0 && (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>
                            {result.type === 'User' ? (
                                <div>
                                    <strong>{result.name}</strong> - Student
                                </div>
                            ) : (
                                <div>
                                    <strong>{result.title}</strong> - Course
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {results.length === 0 && !loading && <p>No results found.</p>}
        </div>
    );
};

export default Search;
