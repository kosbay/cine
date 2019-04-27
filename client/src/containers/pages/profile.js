import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getAppliesByUser } from '../../actions/applyActions';
import { getStudent, addStudent } from '../../actions/studentActions';
import Profile from '../../components/Pages/Profile';

class ProfileContainer extends Component {

  state = {
    lastname: '',
    firstname: '',
    fathername: '',
    bornDate: moment(new Date()),
    school_name: '',
    school_number: '',
    address: '',
    region: '',
    index: '',
    modalIsOpen: false
  }

  componentDidMount() {
    this.props.getAppliesByUser();
    this.props.getStudent();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success.success) {
      this.setState({
        modalIsOpen: true
      })
    }
    if(nextProps.student.student) {
      this.setState({
        lastname: nextProps.student.student.lastname,
        firstname: nextProps.student.student.firstname,
        fathername: nextProps.student.student.fathername,
        bornDate: moment(nextProps.student.student.bornDate),
        school_name: nextProps.student.student.school_name,
        school_number: nextProps.student.student.school_number,
        address: nextProps.student.student.location.address,
        region: nextProps.student.student.location.region,
        index: nextProps.student.student.location.index
      })
    }
  }

  closeModal = props => {
    this.setState({
      modalIsOpen: false
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDate = date => {
    this.setState({
      bornDate: date
    })
  }

  onSubmit = () => {
    const updateProfile = {
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      fathername: this.state.fathername,
      bornDate: this.state.bornDate,
      school_name: this.state.school_name,
      school_number: this.state.school_number,
      address: this.state.address,
      region: this.state.region,
      index: this.state.index
    }

    this.props.addStudent(updateProfile);
  }

  render() {
    return(
      <Profile
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        handleDate={this.handleDate}
        closeModal={this.closeModal}
        {...this.props}
        {...this.state}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  student: state.student,
  apply: state.apply,
  success: state.success
})

export default connect(mapStateToProps, { getAppliesByUser, getStudent, addStudent })(ProfileContainer);
