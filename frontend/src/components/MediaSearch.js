import React, { useState } from 'react';
import API_BASE from '../api';

const MediaSearch = () => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/nasa-search?q=${query}&media_type=${mediaType}`);
      const data = await res.json();
      setResults(data.items || []);
      setError('');
    } catch {
      setError('Failed to load media');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search NASA media (e.g. Mars, Apollo)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} style={{ marginLeft: '0.5rem' }}>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
        <button onClick={handleSearch} style={{ marginLeft: '0.5rem' }}>🔍 Search</button>
      </div>

      {error && <p>{error}</p>}
      {results.length === 0 && query && <p>No results found.</p>}

      <div className="media-grid">
        {results.map((item) => {
          const data = item.data[0];
          const thumbnail = item.links?.[0]?.href;
          return (
            <div key={item.href} className="media-item">
              <img src={thumbnail} alt={data.title} />
              <h4>{data.title}</h4>
              <p>{data.date_created.split('T')[0]}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer">View More ➜</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaSearch;
