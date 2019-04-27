import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const data = [{name: 'Group A', value: 205}, {name: 'Group D', value: 287}];
const data2 = [{name: 'Group A', value: 162}, {name: 'Group D', value: 125}];
const data3 = [{name: 'Group A', value: 187}, {name: 'Group D', value: 100}];
const COLORS = ['#E2E7EE', '#1991EB'];
const COLORS2 = ['#E2E7EE', '#FDC018'];
const COLORS3 = ['#E2E7EE', '#9D90E4'];

const RADIAN = Math.PI / 180;

const Stats = props =>

  <div className="charts-s-nav">
    <span className="s-nav-text">Статистика за неделю</span><br />
    <div className="stats-s-nav">
      <PieChart width={50} height={50}>
        <Pie
          dataKey="value"
          data={data}
          innerRadius={20}
          outerRadius={25}
          fill="#8884d8"
          paddingAngle={5}
        >
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      <div className="stats-text">
        <div className="s-nav-text">205 / 287</div>
        <div className="stat-text-m">Заявок одобрено</div>
      </div>
    </div>
    <div className="stats-s-nav">
      <PieChart width={50} height={50}>
        <Pie
          dataKey="value"
          data={data2}
          innerRadius={20}
          outerRadius={25}
          fill="#8884d8"
          paddingAngle={5}
        >
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS2[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      <div className="stats-text">
        <div className="s-nav-text">162 / 125</div>
        <div className="stat-text-m">Парней / Девушек</div>
      </div>
    </div>
    <div className="stats-s-nav">
      <PieChart width={50} height={50}>
        <Pie
          dataKey="value"
          data={data3}
          innerRadius={20}
          outerRadius={25}
          fill="#8884d8"
          paddingAngle={5}
        >
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS3[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      <div className="stats-text">
        <div className="s-nav-text">187 / 100</div>
        <div className="stat-text-m">Технические / Гуманитарные</div>
      </div>
    </div>
  </div>



export default Stats;