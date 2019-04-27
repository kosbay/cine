import React, { Fragment } from 'react';
import  { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
      {name: 'Астана', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Алматы', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Шымкент', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Павлодар', uv: 2390, pv: 3800, amt: 2500}
];

const SimpleBarChart = props =>

    <BarChart width={400} height={100} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name" tick={{fontSize: 12}} />

       <Tooltip />
       <Bar dataKey="pv" barSize={10} fill="#8884d8" />
    </BarChart>

export default SimpleBarChart;
