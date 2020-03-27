import React from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  Legend,
  Line
} from "recharts";

const CustomAreaChart = ({ timeseries }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={timeseries.timelines}>
        <defs>
          <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8cb11e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8cb11e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDeath" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#b10e03" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#b10e03" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="confirmed"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorConfirmed)"
        />
        <Area
          type="monotone"
          dataKey="recovered"
          stroke="#8cb11e"
          fillOpacity={1}
          fill="url(#colorRecovered)"
        />
        <Area
          type="monotone"
          dataKey="death"
          stroke="#b10e03"
          fillOpacity={1}
          fill="url(#colorDeath)"
        />
        <Legend verticalAlign="top" height={36} />
        <Line
          name="Confirmed"
          type="monotone"
          dataKey="confirmed"
          stroke="#8884d8"
        />
        <Line
          name="Recovered"
          type="monotone"
          dataKey="recovered"
          stroke="#8cb11e"
        />
        <Line name="Dead" type="monotone" dataKey="death" stroke="#b10e03" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
