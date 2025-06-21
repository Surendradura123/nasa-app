// File: NeoViewer.js
import React, { useState } from 'react';
import NeoChart from './NeoChart';
import NeoTable from './NeoTable';
import API_BASE from '../api';

const NeoViewer = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [neoData, setNeoData] = useState([]);
  const [neoList, setNeoList] = useState([]);
  const [showHazardousOnly, setShowHazardousOnly] = useState(false);
  const [error, setError] = useState('');

  const fetchNEO = async () => {
    try {
      const res1 = await fetch(`${API_BASE}/api/neo?start_date=${startDate}&end_date=${endDate}`);
      const data1 = await res1.json();

      const res2 = await fetch(`${API_BASE}/api/neo/list?start_date=${startDate}&end_date=${endDate}`);
      const data2 = await res2.json();

      const neoArray = Object.entries(data1.near_earth_objects).map(([date, objects]) => ({
        date,
        count: objects.length
      }));

      setNeoData(neoArray);
      setNeoList(data2);
      setError('');
    } catch {
      setError('Failed to load NEO data');
    }
  };

  const filteredList = showHazardousOnly
    ? neoList.filter((neo) => neo.hazardous)
    : neoList;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label style={{ marginLeft: '1rem' }}>End Date: </label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchNEO} style={{ marginLeft: '1rem' }}>Fetch NEOs</button>
      </div>

      <label style={{ display: 'block', marginBottom: '1rem' }}>
        <input
          type="checkbox"
          checked={showHazardousOnly}
          onChange={() => setShowHazardousOnly(!showHazardousOnly)}
        />{' '}
        Show only hazardous asteroids
      </label>

      {error && <p>{error}</p>}

      
      <div>
          {neoData.length > 0 && <NeoChart data={neoData} />}
      </div>
      <div>
          {filteredList.length > 0 && <NeoTable data={filteredList} />}
      </div>
      
     <div>
       {filteredList.length > 0 && (
        <button
          onClick={() => {
            const headers = ['Name', 'Diameter (km)', 'Velocity (km/h)', 'Miss Distance (km)', 'Hazardous?'];
            const rows = filteredList.map((neo) => [
              neo.name,
              neo.diameter,
              neo.velocity,
              neo.miss_distance,
              neo.hazardous ? 'Yes' : 'No'
            ]);
            const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'neo_data.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          style={{ marginTop: '1rem' }}
        >
          📥 Export CSV
        </button>
      )}
     </div>
     
    </div>
  );
};

export default NeoViewer;
