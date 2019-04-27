import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import GoogleMap from './GoogleMap';
import ModalForm from './common/ModalForm';
import { fileserver } from '../../../constants';
import EditContact from './common/EditContact';

class Contact extends Component {

  state = {
    typeOfFile: "logo",
    modalIsOpen: false,
    edit: false
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success.success && this.state.edit) {
      this.setState({
        edit: false
      })
    }
  }

  switchOn = () => {
    this.props.setUniver()
    this.setState({
      edit: true
    })
  }

  switchOff = () =>
    this.setState({
      edit: false
    })

  showModal = () =>{
    this.setState({
      modalIsOpen: true
    })}

  closeModal = () =>
    this.setState({
      modalIsOpen: false
    })

  render() {
    return(
      <div className="u-contact-2">
        {
          this.state.edit ?
            <EditContact
              showModal={this.showModal}
              switchOff={this.switchOff}
              {...this.props}
              {...this.state}
            /> :
              <Fragment>
                <div className="u-contact-h">
                  <img src={`http://${fileserver}:9999/${this.props.univer.univer.logo}`} />
                  <p className="u-c-text">
                    {this.props.univer.univer.univer_name}
                  </p>
                  <div
                    className="add-fac-btn margin-auto margin-t-10 width-cnt-ed text-14"
                    onClick={this.switchOn}
                  >
                    Редактировать профиль
                  </div>
                </div>
                <div className="u-c-about">
                  <div className="u-c-p margin10">
                    <div className="i-c-t-b">Аббревиатура</div>
                    <div className="i-c-t-w">{this.props.univer.univer.addreviation}</div>
                  </div>
                  <div className="u-c-p margin10">
                    <div className="i-c-t-b">Категория</div>
                    <div className="i-c-t-w">{this.props.univer.univer.category}</div>
                  </div>
                  <div className="u-c-p margin10">
                    <div className="i-c-t-b">Тип ВУЗа</div>
                    <div className="i-c-t-w">{this.props.univer.univer.type}</div>
                  </div>
                  <div className="u-c-p margin10">
                    <div className="i-c-t-b">Код ВУЗа</div>
                    <div className="i-c-t-w">{this.props.univer.univer.code}</div>
                  </div>
                  <div className="u-c-p">
                    <div className="i-c-t-b">Номер лицензии</div>
                    <div className="i-c-t-w">{this.props.univer.univer.license}</div>
                  </div>
                </div>
                <GoogleMap
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfPvKrVvV2HltGpO_tkVP1JbyIi_gdSZU&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                  containerElement={<div style={{ height: `100px`, width: `100%` }} />}
                  mapElement={<div style={{ height: `100%`, width: `100%`, marginTop: `20px` }} />}
                  onMap={this.props.onMap}
                  {...this.props.univer.univer.location}
                />
                <div className="u-c-address">
                  <div className="u-c-p margin10">
                    <div className="i-c-t-b">Адрес</div>
                    <div className="i-c-t-w">{this.props.univer.univer.location.address}</div>
                  </div>
                  <div className="u-c-p margin10">
                    <div className="i-c-t-b">Телефон</div>
                    <div className="i-c-t-w">{this.props.univer.univer.phone}</div>
                  </div>
                  <div className="u-c-p margin10">
                    <div className="i-c-t-b">Электронная почта</div>
                    <div className="i-c-t-w">{this.props.univer.univer.o_email}</div>
                  </div>
                  {
                    this.props.univer.univer.website ?
                      <div className="u-c-p margin10">
                        <div className="i-c-t-b">Сайт</div>
                        <div className="i-c-t-w"><a href={this.props.univer.univer.website} target="__blank">{this.props.univer.univer.website}</a></div>
                      </div> :
                    null
                  }
                  {/*<div className="u-c-p">
                    <div className="i-c-t-b">Соц. сети</div>
                    <div className="i-c-t-w"></div>
                  </div>*/}
                </div>
              </Fragment>
        }
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

export default Contact
