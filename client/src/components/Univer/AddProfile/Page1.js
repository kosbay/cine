import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropZone from 'react-dropzone'

const Step = props =>

  <Fragment>
    <div className="page3">
      <div className="u-c-text">Информация о ВУЗе</div>
      <p className="stat-v-text-t">
        Заполните данные об учебном заведении
      </p>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-row app-form-92">
          <span className="app-text-bold">Название ВУЗа</span><br/>
          <input
            name="univer_name"
            value={props.name}
            onChange={props.onChange}
          />
        {props.errors.univer_name && <span className="val-error"><img src="/images/error.svg" />{props.errors.univer_name}</span>}
        </div>
        <div className="app-form-row width-mid">
          <span className="app-text-bold">Аббревиатура</span><br/>
          <input
            name="addreviation"
            value={props.abbreviation}
            onChange={props.onChange}
          />
        {props.errors.addreviation && <span className="val-error"><img src="/images/error.svg" />{props.errors.addreviation}</span>}
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20 width-form-fo width-55">
        <div className="app-form-row">
          <span className="app-text-bold">Категория</span><br/>
          <input
            name="category"
            value={props.category}
            onChange={props.onChange}
          />
          {props.errors.category && <span className="val-error"><img src="/images/error.svg" />{props.errors.category}</span>}
        </div>
        <div className="app-form-row">
          <span className="app-text-bold">Тип ВУЗа</span><br/>
          <input
            name="type"
            value={props.type}
            onChange={props.onChange}

          />
          {props.errors.type && <span className="val-error"><img src="/images/error.svg" />{props.errors.type}</span>}
        </div>
        <div className="app-form-row width-mid">
          <span className="app-text-bold">Код ВУЗа</span><br/>
          <input
            name="code"
            value={props.code}
            onChange={props.onChange}
          />
          {props.errors.code && <span className="val-error"><img src="/images/error.svg" />{props.errors.code}</span>}
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-row width-small width-26">
          <span className="app-text-bold">Номер лицензии</span><br/>
          <input
            name="license"
            value={props.license}
            onChange={props.onChange}
          />
          {props.errors.license && <span className="val-error"><img src="/images/error.svg" />{props.errors.license}</span>}
        </div>
        <div className="app-form-row width-small width-hz">
          <span className="app-text-bold">Годен до</span><br/>
          <DatePicker
            className="width-hq"
            name="expire"
            selected={props.expire}
            onChange={props.handleDate}
            dateFormat="L"
            locale="ru-kz"
          />
        </div>
      </div>
      <div className="hr"></div>
        <div className="app-form-stp1 marg-t-20 width-form">
          <div className="app-form-rowl width-form-f">
          <span className="app-text-bold">Описание</span><br/>
          <textarea
            className="textarea"
            name="description"
            value={props.description}
            onChange={props.onChange}
          />
          {props.errors.description && <span className="val-error"><img src="/images/error.svg" />{props.errors.description}</span>}
        </div>
      </div>
    </div>

    <div className="page3">
      <div className="u-c-text">Загрузить фотографию ВУЗа</div>
      <div className="flex-block">
        <DropZone
          accept="image/jpg, image/jpeg"
          className={`dropzone-2 ${ props.file1 ? 'dz-active' : null}`}
          onDrop={(accepted, rejected, name) => props.onDrop(accepted, rejected, 'file1')}
          onDragEnter={name => props.onDragEnter('file1')}
          onDragLeave={props.onDragLeave}
        >
          <div className="m-upl">
            {
              props.file1A && props.file1A.length !== 0 ?
              <Fragment>
                <img src="/images/ID-ready.svg" /><br />
                <span className="stat-v-text">Загруженно</span>
              </Fragment> :
                props.rejected.length > 0 ?
              <Fragment>
                <img src="/images/ID.svg" /><br />
                <span className="stat-v-text">Файлы должны быть в JPEG</span>
              </Fragment> :
              <Fragment>
                <img src="/images/ID.svg" /><br />
                <span className="stat-v-text">Перетащите сюда лого</span>
              </Fragment>
            }
            <br/>
            <button className="upl-btn">Выберите файл</button>
          </div>
        </DropZone>
        <DropZone
          accept="image/jpg, image/jpeg"
          className={`dropzone-2 ${ props.file2 ? 'dz-active' : null}`}
          onDrop={(accepted, rejected, name) => props.onDrop(accepted, rejected, 'file2')}
          onDragEnter={name => props.onDragEnter('file2')}
          onDragLeave={props.onDragLeave}
        >
          <div className="m-upl">
            {
              props.file2A && props.file2A.length !== 0 ?
              <Fragment>
                <img src="/images/ID-ready.svg" /><br />
                <span className="stat-v-text">Загруженно</span>
              </Fragment> :
                props.rejected.length > 0 ?
              <Fragment>
                <img src="/images/ID.svg" /><br />
                <span className="stat-v-text">Файлы должны быть в JPEG</span>
              </Fragment> :
              <Fragment>
                <img src="/images/ID.svg" /><br />
                <span className="stat-v-text">Перетащите сюда фото</span>
              </Fragment>
            }
            <br/>
            <button className="upl-btn">Выберите файл</button>
          </div>
        </DropZone>
      </div>
    </div>
  </Fragment>

export default Step
