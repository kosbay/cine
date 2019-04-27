import React, { Component } from 'react'
import { connect } from 'react-redux'

import Home from '../../components/Pages/Home'
import { getTopSpec } from '../../actions/specActions'
import { getTopUnivers } from '../../actions/univerActions'

class HomeContainer extends Component {

  componentDidMount() {
    this.props.getTopUnivers()
    this.props.getTopSpec()
  }

  render() {
    return (
      <Home {...this.props} />
    )
  }
}

const mapStateToProps  = state => ({
  univer: state.univer,
  top_univers: state.univers,
  spec: state.spec
})

export default connect(mapStateToProps, { getTopUnivers, getTopSpec })(HomeContainer)
