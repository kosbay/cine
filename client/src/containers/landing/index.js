import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUnivers } from '../../actions/univerActions';
import LandingPage from '../../components/Landing';

class Landing extends Component {

  state = {
    email: '0'
  }

  componentDidMount() {
    this.props.getUnivers();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <LandingPage
        onChange={this.onChange}
        {...this.state}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  univer: state.univer
})

export default connect(mapStateToProps, { getUnivers })(Landing)
