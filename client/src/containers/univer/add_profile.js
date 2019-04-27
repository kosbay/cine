import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import { createUniverProfile, getCurrentUniversityProfile } from '../../actions/univerActions'
import AddProfile from '../../components/Univer/AddProfile'

class AddProfileContainer extends Component {

  state = {
    univer_name: '',
    addreviation: '',
    category: '',
    code: '',
    type: '',
    license: '',
    expire: moment(new Date()),
    description: '',
    region: '',
    address: '',
    lat: 43.238949,
    lng: 76.889709,
    phone: '',
    o_email: '',
    website: '',
    fb: '',
    insta: '',
    twitter: '',
    vk: '',
    youtube: '',
    other: '',
    accepted: [],
    file1A: [],
    file2A: [],
    file1: false,
    file2: false,
    rejected: [],
    errors: {},
    placeholder: 'Не объязательное поле',
    disabled: false
  }

  componentDidMount() {
    this.props.getCurrentUniversityProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile && Object.keys(nextProps.profile.profile).length > 0) {
      nextProps.history.push('/univer/profile')
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        disabled: false
      })
    }
  }

  selectCountry = val => {
    this.setState({ country: val });
  }

  selectRegion = val => {
    this.setState({ region: val });
  }

  onDrop = (accepted, rejected, name) => {
    if(name === 'file1') {
      this.setState({
        file1A: accepted[0],
        accepted: [...this.state.accepted, accepted[0]],
        rejected: [...this.state.rejected, rejected],
        file1: false
      })
    } else if(name === 'file2') {
      this.setState({
        file2A: accepted[0],
        accepted: [...this.state.accepted, accepted[0]],
        rejected: [...this.state.rejected, rejected],
        file2: false
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
    }
  }

  onDragLeave = () => {
    this.setState({
      file1: false,
      file2: false
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDate = date => {
    this.setState({
      expire: date
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const newProfile = {
      univer_name: this.state.univer_name,
      addreviation: this.state.addreviation,
      category: this.state.category,
      code: this.state.code,
      type: this.state.type,
      license: this.state.license,
      expire: this.state.expire,
      description: this.state.description,
      region: this.state.region,
      address: this.state.address,
      lat: this.state.lat,
      lng: this.state.lng,
      phone: this.state.phone,
      o_email: this.state.o_email,
      website: this.state.website,
      fb: this.state.fb,
      insta: this.state.insta,
      twitter: this.state.twitter,
      vk: this.state.vk,
      youtube: this.state.youtube,
      other: this.state.other
    }

    this.props.createUniverProfile(newProfile, [this.state.file1A, this.state.file2A], this.props.history)
    this.setState({ disabled: true })
  }

  onClear = () => {
    this.setState({
      univer_name: '',
      addreviation: '',
      category: '',
      code: '',
      type: '',
      license: '',
      expire: moment(new Date()),
      description: '',
      region: 'almaty',
      address: '',
      phone: '',
      o_email: '',
      website: '',
      fb: '',
      insta: '',
      twitter: '',
      vk: '',
      youtube: '',
      other: '',
      accepted: [],
      file1A: [],
      file2A: [],
      file1: false,
      file2: false,
      rejected: [],
      errors: {},
      disabled
    })
  }

  onMap = e => {
    this.setState({
      lat: e.lat(),
      lng: e.lng()
    })
  }

  render() {
    return (
      <AddProfile
        onMap={this.onMap}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onDrop={this.onDrop}
        onSubmit={this.onSubmit}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        handleDate={this.handleDate}
        selectCountry={this.selectCountry}
        selectRegion={this.selectRegion}
        onClear={this.onClear}
        {...this.props}
        {...this.state}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.univer,
  errors: state.errors
})

export default connect(mapStateToProps, { createUniverProfile, getCurrentUniversityProfile })(withRouter(AddProfileContainer))
