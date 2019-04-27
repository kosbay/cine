import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddFacul from '../../components/Univer/AddFacul';
import { addFacSpec } from '../../actions/faculActions';

class AddFaculContainer extends Component {

  state = {
    name_of_fac: '',
    specs: [{ name: '', code: '', staff_1: '', staff_2: '' }],
    modalIsOpen: false,
    loading: false,
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        loading: false
      })
    }
    if (nextProps.success.success) {
      this.setState({
        modalIsOpen: true,
        loading: false
      })
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSpecChange = idx => e => {
    const newSpec = this.state.specs.map((spec, sidx) => {
      if (idx !== sidx) return spec;
      return { ...spec, [e.target.name]: e.target.value };
    });

    this.setState({ specs: newSpec });
  }

  addInput = () => {
    this.setState({
      specs: this.state.specs.concat([{ name: '', code: '' }])
    })
  }

  removeInput = idx => {
    this.setState({
      specs: this.state.specs.filter((s, sidx) => idx !== sidx)
    });
  }

  closeModal = () => {
    location.reload()
  }

  onSubmit = () => {
    this.props.addFacSpec(this.state.name_of_fac, this.state.specs)
    this.setState({ loading: true })
  }

  render() {
    return(
      <AddFacul
        addInput={this.addInput}
        removeInput={this.removeInput}
        onChange={this.onChange}
        onSpecChange={this.onSpecChange}
        onSubmit={this.onSubmit}
        closeModal={this.closeModal}
        {...this.props}
        {...this.state}
      />
    )
  }
};

const mapStateToProps = state => ({
  success: state.success,
  errors: state.errors
});

export default connect(mapStateToProps, { addFacSpec })(AddFaculContainer);
