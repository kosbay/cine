import React, { Component } from 'react';
import Modal from 'react-modal';

import Info from './Info';
import AppliesList from './AppliesList';

class Profile extends Component {

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    return(
      <div className="home">
        <div className="btn-wrap">
          <Info {...this.props} />
          <AppliesList {...this.props} />
        </div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Example Modal"
          contentLabel="Example Modal"
          className="modal modal-top-10 success-mod"
          overlayClassName="overlay-err"
        >
          <div className="att-modal">
            <div className="flex">
              <img src="/images/tick.svg" />
              <span className="success-text att-text">
                Вы успешно изменили профиль
              </span>
            </div>
            <img onClick={this.props.closeModal} src="/images/close-button.svg" />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Profile;
