import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';

import Review from './Review';
import ModalForm from './ModalForm';

class Reviews extends Component {

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    return(
      <Fragment>
        <div className="help-page">
          <div className="head-jc-sb">
            <div className="text-18">Отзывы ({this.props.reviews.count ? this.props.reviews.count : 0})</div>
            <button onClick={this.props.openModal} className="btn-app-b">Оставить отзыв</button>
          </div>
          {
            this.props.reviews.revs ?
              this.props.reviews.revs.map(rev =>
                <Review key={rev._id} {...rev} />
              )
             :
            null
          }
        </div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Example Modal"
          contentLabel="Example Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <ModalForm
            {...this.props}
          />
        </Modal>
      </Fragment>
    )
  }
}

export default Reviews;
