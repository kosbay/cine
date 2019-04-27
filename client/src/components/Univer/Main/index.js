import React from 'react';

import Stats1 from './Stats/Stats1';
import Stats2 from './Stats/Stats2';
import TableLogic from './TableLogic';

const Main = props =>

  <div className="home">
    <div className="card-container">
      <Stats1 />
      <Stats2 />
    </div>
    <TableLogic {...props} />
  </div>

export default Main;
