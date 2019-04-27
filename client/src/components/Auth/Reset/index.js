import React, { Component } from 'react'
import {   withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { sendToken } from '../../../actions/authActions'
import Page from './Page'


class Reset extends Component {

  state = {
    email: ''
  }

  emailHandler = e => {

    e.preventDefault()
    this.setState({ email: e.target.value })
  }

  sendToken = e => {

    e.preventDefault()
    this.props.sendToken(this.state.email, this.props.history)
  }

  render() {

    return (

        <Page
          emailHandler={this.emailHandler}
          sendToken={this.sendToken}
          {...this.state}
        />


    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { sendToken })(withRouter(Reset))
