import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarsRoverViewer = () => {
  const [photos, setPhotos] = useState([]);
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState(1000);
  const [camera, setCamera] = useState('');
  const [error, setError] = useState('');

  const fetchPhotos = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/mars?rover=${rover}&sol=${sol}&camera=${camera}`
      );
      setPhotos(data.photos || []);
      setError('');
    } catch (err) {
      setError('Error fetching Mars photos.');
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [rover, sol, camera]);

  return (
    <div>
      <div className="filters">
        <label>Rover:
          <select value={rover} onChange={e => setRover(e.target.value)}>
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </label>
        <label>Sol:
          <input type="number" value={sol} onChange={e => setSol(e.target.value)} />
        </label>
        <label>Camera:
          <select value={camera} onChange={e => setCamera(e.target.value)}>
            <option value="">All</option>
            <option value="FHAZ">Front Hazard</option>
            <option value="RHAZ">Rear Hazard</option>
            <option value="NAVCAM">Navigation</option>
          </select>
        </label>
      </div>

      {error && <p>{error}</p>}

      <div className="photo-grid">
        {photos.map(photo => (
          <img key={photo.id} src={photo.img_src} alt={photo.camera.full_name} />
        ))}
      </div>
    </div>
  );
};

export default MarsRoverViewer;
