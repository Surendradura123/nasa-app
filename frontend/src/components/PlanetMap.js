// File: PlanetMap.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Placeholder GeoJSON (real crater data should be imported)
const marsCraters = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Gale Crater" },
      "geometry": {
        "type": "Point",
        "coordinates": [137.4, -5.4] // [lng, lat]
      }
    }
  ]
};

const layerOptions = {
  Mars: {
    url: 'https://trek.nasa.gov/tiles/Mars/EQ/MOLA_Color_Shaded_Relief/1.0.0/Mars_MOLA_Color_Shaded_Relief/default/default028mm/{z}/{y}/{x}.jpg',
    attribution: 'NASA Mars Trek'
  },
  Moon: {
    url: 'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd/1.0.0/LRO_WAC_Mosaic_Global_303ppd/default/default028mm/{z}/{y}/{x}.jpg',
    attribution: 'NASA Moon Trek'
  },
  Vesta: {
    url: 'https://trek.nasa.gov/tiles/Vesta/EQ/Vesta_ClrMosaic_Global_50ppd/1.0.0/Vesta_ClrMosaic_Global_50ppd/default/default028mm/{z}/{y}/{x}.jpg',
    attribution: 'NASA Vesta Trek'
  }
};

const LocateButton = () => {
  const map = useMap();

  const locate = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.setView([latitude, longitude], 6);
    });
  };

  return (
    <button onClick={locate} style={{
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1000,
      padding: '0.4rem 0.8rem',
      background: '#66fcf1',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      📍 Locate Me
    </button>
  );
};

const PlanetMap = () => {
  const [planet, setPlanet] = useState('Mars');
  const [search, setSearch] = useState('');

  return (
    <div>
      <h2>🗺️ Planetary Trek Viewer</h2>
      <select value={planet} onChange={(e) => setPlanet(e.target.value)}>
        <option value="Mars">Mars</option>
        <option value="Moon">Moon</option>
        <option value="Vesta">Vesta</option>
      </select>

      <input
        type="text"
        placeholder="Search craters (e.g. Gale)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: 'block', margin: '1rem 0', padding: '0.5rem', width: '100%' }}
      />

      <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%', position: 'relative' }}>
        <TileLayer
          url={layerOptions[planet].url}
          attribution={layerOptions[planet].attribution}
        />
        <LocateButton />
        {planet === 'Mars' && (
          <GeoJSON
            data={marsCraters}
            pointToLayer={(feature, latlng) => L.circleMarker(latlng)}
            onEachFeature={(feature, layer) => {
              if (feature.properties.name.toLowerCase().includes(search.toLowerCase())) {
                layer.bindPopup(`<strong>${feature.properties.name}</strong>`).openPopup();
              }
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default PlanetMap;
