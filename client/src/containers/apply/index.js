import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { getUnivers } from '../../actions/univerActions'
import { getFacsByUniver, getSpecsByFac } from '../../actions/faculActions'
import { createApply } from '../../actions/applyActions'
import Apply from '../../components/Apply'

class ApplyContainer extends Component {

  state = {
    firstname: '',
    lastname: '',
    fathername: '',
    sex: 'male',
    born_date: moment(),
    univer_name: this.props.match.params.name,
    univer_id: this.props.match.params.id,
    facultet: this.props.match.params.fac_name,
    facultet_id: this.props.match.params.fac_id,
    special: this.props.match.params.spec_name,
    special_id: this.props.match.params.spec_id,
    school_name: '',
    num_of_school: '',
    country: 'Казахстан',
    region: '',
    city: '',
    address: '',
    index: '',
    card_number: '',
    card_name: '',
    exp_date_month: '',
    exp_date_year: '',
    cvv: '',
    accepted: [],
    rejected: [],
    file1a: [],
    file2a: [],
    file3a: [],
    file4a: [],
    file5a: [],
    file1: false,
    file2: false,
    file3: false,
    file4: false,
    file5: false,
    errors: {},
    payModalIsOpen: false,
    modalIsOpen: false
  }

  componentDidMount() {
    this.props.getUnivers()
    this.props.getFacsByUniver(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (Object.keys(nextProps.errors).length > 0) {
      this.setState({ modalIsOpen: true })
    }
  }

  componentWillMount() {
    this.setState({ errors: {} })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onCardChange = (e, name) => {
    this.setState({ [name]: e.target.value })
  }

  handleUniver = e => {
    this.setState({
      univer_name: e.label,
      univer_id: e.value,
      facultet: '',
      facultet_id: "0",
      special: '',
      special_id: "0"
    })
    this.props.getFacsByUniver(e.value)
  }

  handleFac = e => {
    this.setState({
      facultet: e.label,
      facultet_id: e.value,
      special: '',
      special_id: "0"
    })
    this.props.getSpecsByFac(e.value)
  }

  handleSpec = e => {
    this.setState({
      special: e.label,
      special_id: e.value
    })
  }

  handleBornDate = date => {
    this.setState({
      born_date: date
    })
  }

  onDrop = (accepted, rejected, name) => {
    if(name === 'file1') {
      this.setState({
        file1a: accepted,
        accepted: [...this.state.accepted, accepted[0]],
        rejected: [...this.state.rejected, rejected],
        file1: false
      })
    } else if(name === 'file2') {
      this.setState({
        file2a: accepted,
        accepted: [...this.state.accepted, accepted[0]],
        rejected: [...this.state.rejected, rejected],
        file2: false
      })
    } else if(name === 'file3') {
      this.setState({
        file3a: accepted,
        accepted: [...this.state.accepted, accepted[0]],
        rejected: [...this.state.rejected, rejected],
        file3: false
      })
    } else if(name === 'file4') {
      this.setState({
        file4a: accepted,
        accepted: [...this.state.accepted, accepted[0]],
        rejected: [...this.state.rejected, rejected],
        file4: false
      })
    } else if(name === 'file5') {
      this.setState({
        file5a: accepted,
        accepted: [...this.state.accepted, accepted[0]],
        rejected: [...this.state.rejected, rejected],
        file5: false
      })
    }
  }

  onDragEnter = name => {
    if(name === 'file1') {
      this.setState({
        file1: true
      })
    } else if(name === 'file2') {
      this.setState({
        file2: true
      })
    } else if(name === 'file3') {
      this.setState({
        file3: true
      })
    } else if(name === 'file4') {
      this.setState({
        file4: true
      })
    } else if(name === 'file5') {
      this.setState({
        file5: true
      })
    }
  }

  onDragLeave = () => {
    this.setState({
      file1: false,
      file2: false,
      file3: false,
      file4: false,
      file5: false
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      payModalIsOpen: false,
      errors: {}
    });
  }

  onSubmit = e => {
    e.preventDefault()

    const newApply = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      fathername: this.state.fathername,
      sex: this.state.sex,
      school_name: this.state.school_name,
      num_of_school: this.state.num_of_school,
      univer_id: this.state.univer_id,
      facultet_id: this.state.facultet_id,
      special_id: this.state.special_id,
      region: this.state.region,
      city: this.state.city,
      address: this.state.address,
      index: this.state.index
    }

    const cardData = {
      cardName: this.state.card_name,
      cardEmail: 'mr.grandapple1991@gmail.com',
    }

    const checkout = new cp.Checkout('pk_8860a651411c59eed654d32022bc4', document.getElementById('paymentForm'))
    this.props.createApply(
      checkout,
      cardData,
      newApply,
      this.state.accepted,
      this.props.history
    )
  }

  render() {
    return (
      <Apply
        handleUniver={this.handleUniver}
        handleFac={this.handleFac}
        handleSpec={this.handleSpec}
        handleBornDate={this.handleBornDate}
        onChange={this.onChange}
        onCardChange={this.onCardChange}
        onDrop={this.onDrop}
        onSubmit={this.onSubmit}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        closeModal={this.closeModal}
        {...this.state}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  univer: state.univer,
  fac: state.fac,
  success: state.success,
  errors: state.errors
})

export default connect(mapStateToProps, {
  createApply,
  getUnivers,
  getFacsByUniver,
  getSpecsByFac
})(ApplyContainer)
