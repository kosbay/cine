import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import UnHeader from '../Layout/UnHeader'
import Registration from '../../containers/auth/registration'
import UniverRegistration from '../../containers/auth/univer_registration'
import Login from '../../containers/auth/login'
import Reset from '../Auth/Reset'
import NextPage from '../Auth/Reset/NextPage'
import NewPassword from '../Auth/Reset/NewPassword'
import AddProfile from '../../containers/univer/add_profile';

const AuthRoutes = props =>

  <Fragment>
    <UnHeader />
    <Switch>
      <Route path={`${props.match.path}/registration/:email`} component={Registration} />
      <Route path={`${props.match.path}/unver_registration`} component={UniverRegistration} />
      <Route path={`${props.match.path}/login`} component={Login} />
      <Route exact path={`${props.match.path}/reset`} component={Reset} />
      <Route path={`${props.match.path}/sendedpass`} component={NextPage} />
      <Route path={`${props.match.path}/reset/:token`} component={NewPassword} />
    </Switch>
  </Fragment>

export default AuthRoutes
