import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import EpicTimeline from './EpicTimeline';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_BASE from '../api';

const EpicViewer = () => {
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [timelineData, setTimelineData] = useState([]);

  const fetchData = (date = '') => {
    const dateQuery = date ? `?date=${date}` : '';
    fetch(`${API_BASE}/api/epic${dateQuery}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setImages(data);
        setError('');
      })
      .catch(() => setError('Could not load EPIC images'));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const pastDays = Array.from({ length: 10 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      return d.toISOString().split('T')[0];
    });

    Promise.all(
      pastDays.map((date) =>
        fetch(`${API_BASE}/api/epic?date=${date}`)
          .then((res) => (res.ok ? res.json() : []))
          .then((images) => ({ date, count: images.length }))
      )
    ).then(setTimelineData);
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchData(date);
  };

  return (
    <div className="epic-viewer">
      <h2>🌍 Earth from Space (EPIC)</h2>

      {timelineData.length > 0 && (
        <EpicTimeline
          timelineData={timelineData}
          onDateClick={(clickedDate) => {
            setSelectedDate(clickedDate);
            fetchData(clickedDate);
          }}
        />
      )}

      <label>Select a date (YYYY-MM-DD): </label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        max={new Date().toISOString().split('T')[0]}
      />

      {error && <p>{error}</p>}
      {!images.length && !error && <p>Loading...</p>}

      {images.length > 0 && (
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          adaptiveHeight={true}
        >
          {images.map((img) => {
            const date = img.date.split(' ')[0].replace(/-/g, '/');
            const url = `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${img.image}.png`;
            return (
              <div key={img.identifier} className="epic-slide">
                <img
                  src={url}
                  alt={img.caption}
                  style={{ maxWidth: '100%', borderRadius: '12px' }}
                />
                <p style={{ textAlign: 'center' }}>{img.date}</p>
                <a
                  href={url}
                  download={`epic-${img.image}.png`}
                  style={{
                    display: 'inline-block',
                    margin: '0.5rem auto',
                    textAlign: 'center',
                    background: '#66fcf1',
                    color: '#0b0c10',
                    padding: '0.4rem 1rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  ⬇️ Download Image
                </a>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default EpicViewer;
