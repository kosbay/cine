import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../containers/univer/home';
import AddProfile from '../../containers/univer/add_profile';
import AddFacul from '../../containers/univer/add_facul';
import EditProfile from '../../containers/univer/edit_profile';
import UnHeader from '../Layout/UnHeader';
import Layout from '../../components/Layout/UniverLayout';
import DoneApply from '../Apply/DoneApply';

const ProfileRoutes = props =>

  <Switch>
    <Layout>
      <Route exact path={`${props.match.path}`} component={Home} />
      <Route path={`${props.match.path}/add_facul`} component={AddFacul} />
      <Route path={`${props.match.path}/profile`} component={EditProfile} />
      <Route path={`${props.match.path}/done`} component={DoneApply} />
    </Layout>
  </Switch>

export default ProfileRoutes;
