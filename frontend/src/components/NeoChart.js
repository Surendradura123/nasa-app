import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const NeoChart = ({ data }) => {
  return (
    <div style={{ height: 300, marginTop: '2rem' }}>
      <h3>☄️ Near Earth Object Counts Per Day</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ff6f61" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NeoChart;
