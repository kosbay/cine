import React, { Component } from 'react'
import { connect } from 'react-redux'

import Home from '../../components/Univer/Main'
import { getAppliesByUniver, refuse, approved } from '../../actions/applyActions'

class HomeContainer extends Component {

  state = {
    reason: '',
    failModalIsOpen: false,
    errors: {}
  }

  componentDidMount() {
    this.props.getAppliesByUniver(this.props.auth.user.profile)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  openFailModal = () => {
    this.setState({
      failModalIsOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      failModalIsOpen: false
    })
  }

  sendAppr = id =>
    this.props.approved(id)

  sendRefuse = id => {
    this.props.refuse(id, this.state.reason);
  }

  render() {
    return (
      <Home
        onChange={this.onChange}
        sendAppr={this.sendAppr}
        sendRefuse={this.sendRefuse}
        openFailModal={this.openFailModal}
        closeModal={this.closeModal}
        {...this.props}
        {...this.state}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  apply: state.apply,
  errors: state.errors
})

export default connect(mapStateToProps, { getAppliesByUniver, refuse, approved })(HomeContainer)
