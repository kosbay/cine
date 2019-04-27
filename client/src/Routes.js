import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Landing from './containers/landing';
import AuthRoutes from './components/Routes/AuthRoutes';
import StudentRoutes from './components/Routes/StudentRoutes';
import UniverRoutes from './components/Routes/UniverRoutes';
import Conf from './components/Landing/Conf';
import AboutUs from './components/Landing/AboutUs';

const Routes = () =>

  <div className='page'>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/auth' component={AuthRoutes} />
      <Route path="/student" component={StudentRoutes} />
      <Route path="/univer" component={UniverRoutes} />
      <Route path="/conf" component={Conf} />
      <Route path="/about_company" component={AboutUs} />
    </Switch>
  </div>

export default Routes;
