import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { createBrowserHistory } from 'history'

import Routes from './Routes'
import store from './store'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

const history = createBrowserHistory()

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/'
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Routes/>
        </Router>
      </Provider>
    )
  }
}

export default App
