import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PhotoChart = ({ photos }) => {
  const data = photos.reduce((acc, photo) => {
    const cam = photo.camera.name;
    acc[cam] = (acc[cam] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(data).map(([name, count]) => ({ name, count }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#66fcf1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PhotoChart;
