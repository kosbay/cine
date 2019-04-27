import React, { Component } from 'react';
import Modal from 'react-modal';

import Steps from './Steps';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

class Apply extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page1: true,
      page2: false,
      page3: false
    }
    this.renderPage = this.renderPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.backPage = this.backPage.bind(this)
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  renderPage(props, nextPage, backPage) {
    if(this.state.page1 === true) {
      return (
        <Page1
          onDrop={props.onDrop}
          onDragEnter={props.onDragEnter}
          onDragLeave={props.onDragLeave}
          nextPage={nextPage}
          {...props}
        />
      )
    } else if(this.state.page2 === true) {
      return (
        <Page2
          onDrop={props.onDrop}
          onDragEnter={props.onDragEnter}
          onDragLeave={props.onDragLeave}
          nextPage={nextPage}
          backPage={backPage}
          {...props}
        />
      )
    } else if(this.state.page3 === true) {
      return (
        <Page3
          onDrop={props.onDrop}
          onDragEnter={props.onDragEnter}
          onDragLeave={props.onDragLeave}
          backPage={backPage}
          {...props}
        />
      )
    }
  }

  nextPage () {
    if (this.state.page1) {
      this.setState({
        page1: false,
        page2: true,
        page3: false
      })
    } else if (this.state.page2) {
      this.setState({
        page1: false,
        page2: false,
        page3: true
      })
    }
  }

  backPage = () => {
    if (this.state.page2) {
      this.setState({
        page1: true,
        page2: false,
        page3: false
      })
    } else if (this.state.page3) {
      this.setState({
        page1: false,
        page2: true,
        page3: false
      })
    }
  }

  render() {
    return (
      <div className="home flex">
        <form onSubmit={this.props.onSubmit} className="padding20">
          { this.renderPage(this.props, this.nextPage, this.backPage) }
          {
            this.state.page3 === true ?
            <div className="p-next-clear-btn">
              <button className="btn-app-s btn-g" type="submit">Отправить</button>
              <button onClick={this.backPage} className="btn-app-s btn-b">Назад</button>
            </div> :
            null
          }
        </form>
        <Steps
          {...this.props}
        />
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Example Modal"
          contentLabel="Example Modal"
          className="modal modal-top-10 error-mod"
          overlayClassName="overlay-err"
        >
          <div className="att-modal">
            <div className="flex">
              <img src="/images/error.svg" />
              <span className="error-text att-text">
                { this.props.errors && this.props.errors.error }
              </span>
            </div>
            <img onClick={this.props.closeModal} src="/images/close-button.svg" />
          </div>
        </Modal>
        <Modal
          isOpen={this.props.payModalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Example Modal"
          contentLabel="Example Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-h"><span className="modal-h-t">Задать вопрос</span></div>
          <div className="modal-b">
            <span className="m-ta-text">Ваш вопрос</span>
            <span className="g-sml-text">Рейтинг</span><br />
          </div>
          <div className="p-modal-clear-btn-l">
            <button className="btn-app-s btn-bl">Оплатить</button>
            <button className="btn-app-s btn-b">Отменить</button>
          </div>
        </Modal>
      </div>
    )
  }
};

export default Apply;
