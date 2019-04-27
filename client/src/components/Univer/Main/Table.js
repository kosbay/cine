import React, { Component } from 'react';
import Modal from 'react-modal';

import Lightbox from 'react-images';
import { fileserver } from '../../../constants';
import ModalForm from './ModalForm';

class Table extends Component {

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    return(
      <table className="table">
        <thead>
          <tr>
            <td>No.</td>
            <td>ФИО абитуриента</td>
            <td>Код</td>
            <td>Факультет</td>
            <td>Специальность</td>
            <td>Документы</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {
            this.props.apply && Object.keys(this.props.apply).length > 0 ?
              this.props.apply.map((app, i) =>
                <tr key={app._id}>
                  <td>{i + 1}</td>
                  <td>{app.lastname} {app.firstname} {app.fathername}</td>
                  <td>{app.special_id.code}</td>
                  <td>{app.facultet_id.fac_name}</td>
                  <td>{app.special_id.name}</td>
                    <td>
                      <ul className="links">
                        {
                          app.docs.map((doc, i) => (
                            <li key={i} className="link">
                              <img onClick={(e) => this.props.openLightbox(i, e)} src={`http://${fileserver}:9999/${doc.url}`} />
                            </li>
                          ))
                        }
                      </ul>
                      <Lightbox
              					currentImage={this.props.currentImage}
                        images={[
                          { src: `http://${fileserver}:9999/${app.docs[0].url}` },
                          { src: `http://${fileserver}:9999/${app.docs[1].url}` },
                          { src: `http://${fileserver}:9999/${app.docs[2].url}` },
                          { src: `http://${fileserver}:9999/${app.docs[3].url}` },
                          { src: `http://${fileserver}:9999/${app.docs[4].url}` }
                        ]}
              					isOpen={this.props.lightboxIsOpen}
              					onClickImage={this.props.handleClickImage}
              					onClickNext={this.props.gotoNext}
              					onClickPrev={this.props.gotoPrevious}
              					onClickThumbnail={this.props.gotoImage}
              					onClose={this.props.closeLightbox}
              					preventScroll={this.props.preventScroll}
              					showThumbnails={this.props.showThumbnails}
                        onClose={this.props.closeLightbox}
              				/>
                    </td>
                  <td>
                    <button onClick={() => this.props.sendAppr(app._id)} className="btn-info">Принять</button>
                    <button onClick={this.props.openFailModal} className="btn-app">Отказать</button>
                  </td>
                </tr>
              ) :
            <tr>
              <td>Нет заявок</td>
            </tr>
          }
        </tbody>
        <Modal
          isOpen={this.props.failModalIsOpen}
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
      </table>
    )
  }
}

export default Table
