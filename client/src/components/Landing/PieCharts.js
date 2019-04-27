import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const data = [{name: 'Group A', value: 205}, {name: 'Group D', value: 287}];
const data2 = [{name: 'Group A', value: 162}, {name: 'Group D', value: 125}];
const data3 = [{name: 'Group A', value: 187}, {name: 'Group D', value: 100}];
const COLORS = ['#E2E7EE', '#2096EF'];
const COLORS2 = ['#E2E7EE', '#FDC018'];
const COLORS3 = ['#E2E7EE', '#8669E5'];

const RADIAN = Math.PI / 180;

const PieCharts = props =>

  <div className="land-charts">
    <div className="stats-s-nav-l">
      <PieChart width={180} height={180}>
      <text x={90} y={90} textAnchor="middle" dominantBaseline="middle">
        86
     </text>
        <Pie
          dataKey="value"
          data={data}
          innerRadius={80}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
        >
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      <div className="stats-text-l">
        <span className="stat-text-m-l">Учебных заведений</span>
      </div>
    </div>
    <div className="stats-s-nav-l">
      <PieChart width={180} height={180}>
        <Pie
          dataKey="value"
          data={data2}
          innerRadius={80}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
        >
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS2[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      <div className="stats-text-l">
        <span className="stat-text-m-l">Университетов</span>
      </div>
    </div>
    <div className="stats-s-nav-l">
      <PieChart width={180} height={180}>
        <Pie
          dataKey="value"
          data={data3}
          innerRadius={80}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
        >
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS3[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      <div className="stats-text-l">
        <span className="stat-text-m-l">Студентов</span>
      </div>
    </div>
  </div>

export default PieCharts;
