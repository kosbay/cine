import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import EditProfile from '../../components/Univer/EditProfile';
import { createUniverProfile, getUniver, changeDesc, changePhoto, changeLogo } from '../../actions/univerActions';
import { getFacsByUniver, changeSpec, deleteFac, deleteSpec  } from '../../actions/faculActions';
import { getCountRevs, getReviews } from '../../actions/reviewActions';

class UniversityContainer extends Component {

  state = {
    univer_name: '',
    addreviation: '',
    category: '',
    type: '',
    univer_code: '',
    license: '',
    expire: moment(Date.now()),
    region: '',
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
    code: '',
    spec_name: '',
    staff_1: '',
    staff_2: '',
    fileA: [],
    file: false,
    fileA: [],
    file: false,
    accepted: [],
    rejected: [],
    des: '',
    card_number: '',
    exp_to: '',
    cvv: '',
    errors: {}
  }

  componentDidMount() {
    this.props.getUniver();
    this.props.getFacsByUniver(this.props.auth.user.profile);
    this.props.getCountRevs(this.props.auth.user.profile)
    this.props.getReviews(this.props.auth.user.profile)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
    if(nextProps.univer.univer) {
      this.setState({
        des: nextProps.univer.univer.description
      })
    }
  }

  setUniver = () =>{
    this.setState({
      univer_name: this.props.univer.univer.univer_name,
      addreviation: this.props.univer.univer.addreviation,
      category: this.props.univer.univer.category,
      type: this.props.univer.univer.type,
      univer_code: this.props.univer.univer.code,
      license: this.props.univer.univer.license,
      expire: moment(this.props.univer.univer.expire),
      region: this.props.univer.univer.location.region,
      address: this.props.univer.univer.location.address,
      phone: this.props.univer.univer.phone,
      o_email: this.props.univer.univer.o_email,
      site: this.props.univer.univer.website,
      fb: this.props.univer.univer.social ? this.props.univer.univer.social.fb : '',
      insta: this.props.univer.univer.social ? this.props.univer.univer.social.insta : '',
      twitter: this.props.univer.univer.social ? this.props.univer.univer.social.twitter : '',
      vk: this.props.univer.univer.social ? this.props.univer.univer.social.vk : '',
      youtube: this.props.univer.univer.social ? this.props.univer.univer.social.youtube : '',
      other: this.props.univer.univer.social ? this.props.univer.univer.social.other : ''
    })
  }

  setSpec = spec =>
    this.setState({
      code: spec.code,
      spec_name: spec.name,
      staff_1: spec.staff_1,
      staff_2: spec.staff_2
    })

  onDrop = (accepted, rejected) => {
    this.setState({
      fileA: accepted,
      accepted: [...this.state.accepted, accepted[0]],
      rejected: [...this.state.rejected, rejected],
      file: false
    })
  }

  onDragEnter = () => {
    this.setState({
      file: true
    })
  }

  onDragLeave = () => {
    this.setState({
      file: false
    })
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    })

  handleDate = date =>
    this.setState({
      expire: date
    })

  savePhoto = file => {
    if(file === 'wall') {
      this.props.changePhoto(this.state.fileA);
    }
    if(file === 'logo') {
      this.props.changeLogo(this.state.fileA);
    }
  }

  saveDesc = () => {
    this.props.changeDesc(this.state.des);
  }

  saveSpec = async id => {
    const data = {
      code: this.state.code,
      name: this.state.spec_name,
      staff_1: this.state.staff_1,
      staff_2: this.state.staff_2
    }

    await this.props.changeSpec(id, data);
    this.props.getFacsByUniver(this.props.auth.user.profile);
  }

  onDeleteFac = async id => {
    await this.props.deleteFac(id);
    setTimeout(() => {
      this.props.getFacsByUniver(this.props.auth.user.profile);
    }, 500)
  }

  onDeleteSpec = async id => {
    await this.props.deleteSpec(id)
    this.props.getFacsByUniver(this.props.auth.user.profile);
  }

  onSubmit = e => {
    e.preventDefault()
    const newProfile = {
      univer_name: this.state.univer_name,
      addreviation: this.state.addreviation,
      category: this.state.category,
      code: this.state.univer_code,
      type: this.state.type,
      license: this.state.license,
      expire: this.state.expire,
      description: this.state.description,
      region: this.state.region,
      address: this.state.address,
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

    this.props.createUniverProfile(newProfile, [])
  }

  render() {
    return (
      <EditProfile
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onChange={this.onChange}
        handleDate={this.handleDate}
        savePhoto={this.savePhoto}
        saveDesc={this.saveDesc}
        saveSpec={this.saveSpec}
        setUniver={this.setUniver}
        setSpec={this.setSpec}
        onDeleteFac={this.onDeleteFac}
        onDeleteSpec={this.onDeleteSpec}
        onSubmit={this.onSubmit}
        {...this.props}
        {...this.state}
      />
    )
  }
};

const mapStateToProps  = state => ({
  auth: state.auth,
  univer: state.univer,
  fac: state.fac,
  reviews: state.review,
  success: state.success,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getUniver,
  getFacsByUniver,
  changeDesc,
  getCountRevs,
  getReviews,
  changePhoto,
  changeLogo,
  deleteFac,
  deleteSpec,
  changeSpec,
  createUniverProfile
})(UniversityContainer);
