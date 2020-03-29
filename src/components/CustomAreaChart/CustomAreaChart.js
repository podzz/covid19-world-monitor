import React, { useEffect, useState } from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  Legend,
  Line,
  BarChart,
  Bar
} from "recharts";

const CustomAreaChart = ({ timeseries }) => {
  const [getDifferential, setDifferential] = useState([]);
  useEffect(() => {
    const differential = timeseries.map((timeserie, i) => {
      return i === 0
        ? timeserie
        : {
            ...timeserie,
            confirmed: timeserie.confirmed - timeseries[i - 1].confirmed,
            death: timeserie.death - timeseries[i - 1].death
          };
    });
    setDifferential(differential);
  }, [timeseries]);
  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height="50%">
        <AreaChart data={timeseries}>
          <defs>
            <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
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
          <Line name="Dead" type="monotone" dataKey="death" stroke="#b10e03" />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="50%">
        <BarChart data={getDifferential}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="confirmed" stackId="a" fill="green" />
          <Bar dataKey="death" stackId="a" fill="red" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default CustomAreaChart;
