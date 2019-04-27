import React from 'react';

import Tooltip from '../../../Charts/Tooltip'

const Stats2 = props =>

  <div className="stats-for-un margin-l20">
    <div>
      <div className="s-nav-text padd-b5">Популярные города</div>
      <div className="g-sml-text padd-b5">За последние 3 года</div>
    </div>
    <div className="stat-u-block">
      <Tooltip />
    </div>
  </div>

export default Stats2;
