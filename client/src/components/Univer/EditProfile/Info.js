import React, { Component } from 'react';
import Modal from 'react-modal';

import Composition from './Composition';
import ModalForm from './common/ModalForm';
import { fileserver } from '../../../constants';

class Info extends Component {

  state = {
    typeOfFile: "wall",
    modalIsOpen: false,
    showIcon: false
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  showIcon = () =>
    this.setState({
      showIcon: true
    })

  hideIcon = () =>
    this.setState({
      showIcon: false
    })

  closeModal = () =>
    this.setState({
      modalIsOpen: false
    })

  render() {
    return(
      <div className="u-info">
        <div className="u-block">
          <img onMouseEnter={this.showIcon} onMouseOut={this.hideIcon} className="big-image" src={`http://${fileserver}:9999/${this.props.univer.univer.wallpapper}`} />
          {
            this.state.showIcon ?
            <div onMouseEnter={this.showIcon} onClick={() => this.setState({ modalIsOpen: true })} className="ch-i-btn text-14-w">
              <img src="/images/pencil.svg" /> Обновить фото
            </div> :
            null
          }
        </div>
        {/*<div className="u-block u-s-block">
          <span className="h-text-c">ВУЗ в цифрах</span><br/>
          <span className="h-text-b">Данные за 2017 - 2018 учебный год</span>
          <div className="stat-u-block">
            <div className="stat-und-block">
              <span className="h-text-d">СТУДЕНТЫ</span><br/>
              <div className="h-figure-d">21751</div>
              <span className="h-text-d">Поступило: 3 762</span>
            </div>
            <div className="stat-und-block">
              <span className="h-text-d">ВЫПУСКНИКИ</span><br/>
              <div className="h-figure-d">3520</div>
              <span className="h-text-d">За все время: 42 369</span>
            </div>
            <div className="stat-und-block">
              <span className="h-text-d">ПРЕПОДАВАТЕЛИ</span><br/>
              <div className="h-figure-d">127</div>
              <span className="h-text-d">Уволили(сь): 13</span>
            </div>
          </div>
        </div>*/}
        <div className="desc-u-block">
          <Composition {...this.props} />
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          contentLabel="Example Modal"
          className="page1 modal-mini"
          overlayClassName="overlay"
        >
          <ModalForm
            closeModal={this.closeModal}
            typeOfFile={this.state.typeOfFile}
            {...this.props}
          />
        </Modal>
      </div>
    )
  }
}

export default Info
