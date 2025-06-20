import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApodViewer = () => {
  const [apod, setApod] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/apod')
      .then(res => setApod(res.data))
      .catch(err => setError('Failed to fetch data from NASA API'));
  }, []);

  if (error) return <p>{error}</p>;
  if (!apod) return <p>Loading...</p>;

  return (
    <div className="apod-viewer">
      <h2>{apod.title}</h2>
      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} className="apod-img" />
      ) : (
        <iframe title="NASA Video" src={apod.url} frameBorder="0" allow="autoplay" allowFullScreen></iframe>
      )}
      <p>{apod.explanation}</p>
    </div>
  );
};

export default ApodViewer;
