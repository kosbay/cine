import React from 'react';

import Header from './Header';
import SideNav from './SideNav';

const Layout = props =>

  <div className="layout">
    <div className="ch-h">
      <Header count={props.count} />
      {props.children}
    </div>
    <SideNav />
  </div>

export default Layout
