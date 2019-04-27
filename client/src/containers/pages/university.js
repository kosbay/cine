import React, { Component } from 'react';
import { connect } from 'react-redux';

import University from '../../components/Pages/University';
import { getUniverById } from '../../actions/univerActions';
import { getFacsByUniver } from '../../actions/faculActions';
import { addReview, getCountRevs, getReviews } from '../../actions/reviewActions';

class UniversityContainer extends Component {

  state = {
    review: '',
    rating: 0,
    modalIsOpen: false,
    errors: {}
  }

  componentDidMount() {
    this.props.getUniverById(this.props.match.params.id);
    this.props.getFacsByUniver(this.props.match.params.id)
    this.props.getCountRevs(this.props.match.params.id)
    this.props.getReviews(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success.success) {
      this.setState({
        modalIsOpen: false
      })
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    })
  }

  onReview = () => {
    const newReview = {
      review: this.state.review,
      rating: this.state.rating
    }

    this.props.addReview(newReview, this.props.match.params.id)
  }

  render() {
    return (
      <University
        onChange={this.onChange}
        onReview={this.onReview}
        openModal={this.openModal}
        closeModal={this.closeModal}
        changeRating={this.changeRating}
        {...this.props}
        {...this.state}
      />
    )
  }
};

const mapStateToProps  = state => ({
  univer: state.univer,
  reviews: state.review,
  fac: state.fac,
  success: state.success,
  errors: state.errors
});

export default connect(mapStateToProps, { getUniverById, getFacsByUniver, addReview, getCountRevs, getReviews })(UniversityContainer);
