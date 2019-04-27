import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import AddProfile from '../../containers/univer/add_profile';
import UniverProfileRoutes from './UniverProfileRoutes';

const ProfileRoutes = props =>

  <Fragment>
    <Route exact path={`${props.match.path}`} component={AddProfile} />
    <Route path={`${props.match.path}/profile`} component={UniverProfileRoutes} />
  </Fragment>

export default ProfileRoutes;
