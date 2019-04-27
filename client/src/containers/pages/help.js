import React, { Component } from 'react';
import { connect } from 'react-redux';

import Help from '../../components/Pages/Help';
import { getQuests, addQuest } from '../../actions/questActions'

class HelpContainer extends Component {

  state = {
    question: '',
    modalIsOpen: false
  }

  componentDidMount() {
    this.props.getQuests()
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

  onSubmit = () => {
    this.props.addQuest(this.state.question)
  }

  render() {
    return(
      <Help
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        openModal={this.openModal}
        closeModal={this.closeModal}
        {...this.props}
        {...this.state}
      />
    )
  }
}

const mapStateToProps = state => ({
  quest: state.quest
})

export default connect(mapStateToProps, { addQuest, getQuests })(HelpContainer);
