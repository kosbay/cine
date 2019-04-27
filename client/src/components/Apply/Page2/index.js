import React, { Fragment } from 'react'
import DropZone from 'react-dropzone'

const Step = props =>

  <Fragment>
    <div className="page1">
      <div className="stat-v-text-t">ШАГ 4</div>
      <div className="u-c-text">Загрузить Медицинскую справку 086-У</div>
      <DropZone
        accept="image/jpg, image/jpeg"
        className={`dropzone ${ props.file3 ? 'dz-active' : null}`}
        onDrop={(accepted, rejected, name) => props.onDrop(accepted, rejected, 'file3')}
        onDragEnter={name => props.onDragEnter('file3')}
        onDragLeave={props.onDragLeave}
      >
        <div className="m-upl">
          {
            props.file3a.length > 0 ?
            <Fragment>
              <img src="/images/086-ready.svg" /><br />
              <span className="stat-v-text">Загружено</span>
            </Fragment> :
              props.rejected.length > 0 ?
              <Fragment>
                <img src="/images/086.svg" /><br />
                <span className="stat-v-text">Файлы должны быть в JPEG</span>
              </Fragment>
              :
              <Fragment>
                <img src="/images/086.svg" /><br />
                <span className="stat-v-text">Перетащите файл сюда</span>
              </Fragment>
          }
          <br />
          <button className="upl-btn">Выберите файл</button>
        </div>
      </DropZone>
    </div>

      {
          props.sex !== "female" ?
              <div className="page1">
                  <div className="stat-v-text-t">ШАГ 5</div>
                  <div className="u-c-text">Загрузить Приписное свидетельство (военкомат)</div>
                  <DropZone
                      accept="image/jpg, image/jpeg"
                      className={`dropzone ${ props.file4 ? 'dz-active' : null}`}
                      onDrop={(accepted, rejected, name) => props.onDrop(accepted, rejected, 'file4')}
                      onDragEnter={name => props.onDragEnter('file4')}
                      onDragLeave={props.onDragLeave}
                  >
                      <div className="m-upl">
                          {
                              props.file4a.length > 0 ?
                                  <Fragment>
                                      <img src="/images/army-ready.svg" /><br />
                                      <span className="stat-v-text">Загружено</span>
                                  </Fragment> :
                                  props.rejected.length > 0 ?
                                      <Fragment>
                                          <img src="/images/army.svg" /><br />
                                          <span className="stat-v-text">Файлы должны быть в JPEG</span>
                                      </Fragment>
                                      :
                                      <Fragment>
                                          <img src="/images/army.svg" /><br />
                                          <span className="stat-v-text">Перетащите файл сюда</span>
                                      </Fragment>
                          }
                          <br />
                          <button className="upl-btn">Выберите файл</button>
                      </div>
                  </DropZone>
              </div>
              : null
      }

    <div className="p-next-clear-btn">
      <button onClick={props.nextPage} className="btn-app-s btn-g">Далее</button>
      <button onClick={props.backPage} className="btn-app-s btn-b">Назад</button>
    </div>
  </Fragment>

export default Step
