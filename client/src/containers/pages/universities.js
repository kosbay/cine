import React, { Component } from 'react'
import { connect } from 'react-redux'

import Universities from '../../components/Pages/Universities'
import { getUnivers, getCount } from '../../actions/univerActions'

class UniversitiesContainer extends Component {

  componentDidMount() {
    this.props.getUnivers()
    this.props.getCount()
  }

  render() {
    return (
      <Universities {...this.props} />
    )
  }
}

const mapStateToProps  = state => ({
  univer: state.univer
})

export default connect(mapStateToProps, { getUnivers, getCount })(UniversitiesContainer)
