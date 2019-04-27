import React, { Component } from 'react';
import Modal from 'react-modal';

import Question from './Quest';
import ModalForm from './ModalForm';

class Help extends Component {

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    return(
      <div className="home">
        <div className="help-page">
          <div className="head-jc-sb">
            <div className="text-18">Часто задаваемые вопросы</div>
            <button onClick={this.props.openModal} className="btn-app-b">Задать вопрос</button>
          </div>
          {
            this.props.quest.quests ?
              this.props.quest.quests.map(quest =>
                <Question
                  key={quest._id}
                  {...quest}
                />
              ) :
            <div className="quest">
              <div className="text-16">- Пока нет вопросов</div>
              <div className="answer g-mid-text">Пока нет вопросов</div>
            </div>
          }
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
        </div>
      </div>
    )
  }
}

export default Help;
