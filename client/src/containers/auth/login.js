import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import { loginUser, clearErrors } from '../../actions/authActions'
import Login from '../../components/Auth/Login'

class LoginContainer extends Component {

  state = {
    email: '',
    password: '',
    remember_me: false,
    errors: {}
  }

  componentDidMount() {
    this.props.clearErrors()
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === 'student') {
        this.props.history.push('/student')
      }
      if (this.props.auth.user.role === 'univer') {
        this.props.history.push('/univer')
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (nextProps.auth.user.role === 'student') {
        this.props.history.push('/student')
      }
      if (nextProps.auth.user.role === 'univer') {
        this.props.history.push('/univer')
      }
    }

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData)
  }

  render() {
    return (
      <Login
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        {...this.state}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser, clearErrors })(withRouter(LoginContainer))
