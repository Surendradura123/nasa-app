import React from 'react';

const NeoTable = ({ data }) => {
  return (
    <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse',padding:'10px' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Diameter (km)</th>
          <th>Velocity (km/h)</th>
          <th>Miss Distance (km)</th>
          <th>Hazardous?</th>
        </tr>
      </thead>
      <tbody>
        {data.map((neo) => (
          <tr key={neo.id} style={{ backgroundColor: neo.hazardous ? 'red' : 'black' }}>
            <td>{neo.name}</td>
            <td>{neo.diameter}</td>
            <td>{neo.velocity}</td>
            <td>{neo.miss_distance}</td>
            <td>{neo.hazardous ? '⚠️ Yes' : '✅ No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NeoTable;
