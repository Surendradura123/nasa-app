import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EpicTimeline = ({ timelineData, onDateClick }) => {
  return (
    <div style={{ height: 300, marginBottom: '2rem' }}>
      <h3>📈 EPIC Image Count Timeline</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={timelineData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#66fcf1"
            strokeWidth={2}
            onClick={({ activeLabel }) => onDateClick(activeLabel)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EpicTimeline;
