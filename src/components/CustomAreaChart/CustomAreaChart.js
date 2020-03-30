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

const CustomAreaChart = ({ dates }) => {
  const [getInitialChart, setInitialChart] = useState([]);
  const [getDifferential, setDifferential] = useState([]);

  useEffect(() => {
    const parsedDates = JSON.parse(dates);
    // console.log(dates);
    setInitialChart(
      Object.keys(parsedDates).reduce((result, key) => {
        result.push({
          date: key,
          ...parsedDates[key]
        });

        return result;
      }, [])
    );
  }, [dates, setInitialChart]);

  useEffect(() => {
    console.log(getInitialChart);
    const differential = getInitialChart.map((dateData, i) => {
      if (i === 0) {
        return dateData;
      }
      let cases = (dateData.cases || 0) - getInitialChart[i - 1].cases || 0;
      let deaths = (dateData.deaths || 0) - getInitialChart[i - 1].deaths || 0;
      if (cases < 0) {
        cases = 0;
      }
      if (deaths < 0) {
        deaths = 0;
      }
      return i === 0
        ? dateData
        : {
            ...dateData,
            cases,
            deaths
          };
    });
    console.log(differential);
    setDifferential(differential);
  }, [getInitialChart, setDifferential]);
  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height="50%">
        <AreaChart data={getInitialChart}>
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
            dataKey="cases"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorConfirmed)"
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stroke="#b10e03"
            fillOpacity={1}
            fill="url(#colorDeath)"
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            name="Confirmed"
            type="monotone"
            dataKey="cases"
            stroke="#8884d8"
          />
          <Line name="Dead" type="monotone" dataKey="deaths" stroke="#b10e03" />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="50%">
        <BarChart data={getDifferential}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="cases" stackId="a" fill="green" />
          <Bar dataKey="deaths" stackId="a" fill="red" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default CustomAreaChart;
