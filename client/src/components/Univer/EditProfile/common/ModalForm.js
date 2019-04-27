import React, { Fragment } from 'react';
import DropZone from 'react-dropzone';

const ModalForm = props =>

  <Fragment>
    <div className="u-c-text">Загрузить фотографию ВУЗа</div>
    <DropZone
      accept="image/jpg, image/jpeg"
      className={`dropzone ${ props.file ? 'dz-active' : null}`}
      onDrop={(accepted, rejected) => props.onDrop(accepted, rejected)}
      onDragEnter={() => props.onDragEnter()}
      onDragLeave={props.onDragLeave}
    >
      <div className="m-upl">
        {
          props.fileA && props.fileA.length > 0 ?
          <Fragment>
            <img src="/images/ID-ready.svg" /><br />
            <span className="stat-v-text">Загруженно</span>
          </Fragment> :
            props.rejected && props.rejected.length > 0 ?
            <Fragment>
              <img src="/images/ID.svg" /><br />
              <span className="stat-v-text">Файлы должны быть в JPEG</span>
            </Fragment>
            :
            <Fragment>
              <img src="/images/ID.svg" /><br />
              <span className="stat-v-text">Перетащите фото сюда</span>
            </Fragment>
        }
        <br/>
        <button className="upl-btn">Выберите файл</button>
      </div>
    </DropZone>
    <div className="p-next-clear-btn-l-m long-f-b padding-t-20">
      <button onClick={() => props.savePhoto(props.typeOfFile)} className="btn-app-s btn-g">Сохранить</button>
      <button onClick={props.closeModal} className="btn-app-s btn-b">Отмена</button>
    </div>
  </Fragment>

export default ModalForm;
