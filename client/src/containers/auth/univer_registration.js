import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { registerUser } from '../../actions/authActions'
import Registration from '../../components/Auth/Registration'

class RegistrationContainer extends Component {

  state = {
    email: '',
    role: 'univer',
    password: '',
    password2: '',
    errors: {}
  }

  componentDidMount() {
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
    if (nextProps.auth.user.role === 'student') {
      nextProps.history.push('/student')
    }
    if (nextProps.auth.user.role === 'univer') {
      nextProps.history.push('/univer')
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      email: this.state.email,
      role: this.state.role,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  onMap = e => {
    console.log(e);
  }

  render() {
    return (
      <Registration
        onMap={this.onMap}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        {...this.props}
        {...this.state}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(RegistrationContainer))
