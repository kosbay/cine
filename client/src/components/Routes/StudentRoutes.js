import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../containers/pages/home';
import Apply from '../../containers/apply';
import Help from '../../containers/pages/help.js';
import University from '../../containers/pages/university';
import Universities from '../../containers/pages/universities';
import DoneApply from '../Apply/DoneApply';
import Layout from '../Layout/StudentLayout';
import Profile from '../../containers/pages/profile';

const ProfileRoutes = props =>

  <Switch>
    <Layout>
      <Route exact path={`${props.match.path}`} component={Home} />
      <Route path={`${props.match.path}/university/:id`} component={University} />
      <Route path={`${props.match.path}/universities`} component={Universities} />
      <Route path={`${props.match.path}/apply/:name/:id/:fac_name/:fac_id/:spec_name/:spec_id`} component={Apply} />
      <Route path={`${props.match.path}/help`} component={Help} />
      <Route path={`${props.match.path}/done`} component={DoneApply} />
      <Route path={`${props.match.path}/profile`} component={Profile} />
    </Layout>
  </Switch>

export default ProfileRoutes;
