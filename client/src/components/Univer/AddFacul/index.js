import React from 'react';
import Modal from 'react-modal';

import Spinner from '../common/Spinner';

const AddFacul = props =>

  <div className="home">
    <div className="page2">
      <div className="u-c-text">Добавьте факультеты и специальности</div>
      <p className="stat-v-text-t marg-t-20">
        Заполните данные об учебном заведении
      </p>
      <div className="app-form-stp1 marg-t-20 width-form-2">
        <div className="app-form-row">
          <span className="app-text-bold">Название факультета</span><br/>
          <input
            name="name_of_fac"
            value={props.name_of_fac}
            onChange={(e) => props.onChange(e)}
          />
        {props.errors.fac && <span className="val-error"><img src="/images/error.svg" />{props.errors.fac}</span>}
        </div>
      </div>
      {
        props.specs.map((spec, i) =>
          <div key={i} className="app-form-stp1 marg-t-20 padding-l-40 width-form">
            <div className="app-form-row width-mid">
              <span className="app-text-bold">Название специальности</span><br/>
              <input
                name="name"
                value={props.name}
                onChange={props.onSpecChange(i)}
              />
            {props.errors[`name_of_spec${i}`] && <span className="val-error"><img src="/images/error.svg" />{props.errors[`name_of_spec${i}`]}</span>}
            </div>
            <div className="app-form-row width-small">
              <span className="app-text-bold">Код специальности</span><br/>
              <input
                name="code"
                value={props.code}
                onChange={props.onSpecChange(i)}
              />
            {props.errors[`code${i}`] && <span className="val-error"><img src="/images/error.svg" />{props.errors[`code${i}`]}</span>}
            </div>
            <div className="app-form-row width-small-2">
              <span className="app-text-bold">Проф. пред. 1</span><br/>
              <input
                name="staff_1"
                value={props.staff_1}
                onChange={props.onSpecChange(i)}
              />
            {props.errors[`staff_1${i}`] && <span className="val-error"><img src="/images/error.svg" />{props.errors[`staff_1${i}`]}</span>}
            </div>
            <div className="app-form-row width-small-2">
              <span className="app-text-bold">Проф. пред. 2</span><br/>
              <input
                name="staff_2"
                value={props.staff_2}
                onChange={props.onSpecChange(i)}
              />
            {props.errors[`staff_2${i}`] && <span className="val-error"><img src="/images/error.svg" />{props.errors[`staff_2${i}`]}</span>}
            </div>
            <div onClick={() => props.removeInput(i)} className="delete-icon"><img src="/images/delete-icon.svg" /></div>
          </div>
        )
      }
      <div onClick={props.addInput} className="add-spec padding-l-40"><img className="add-spec-icon" src="/images/add-spec-icon.svg" /><span className="blue-text">Добавить специальность</span></div>
    </div>
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
      contentLabel="Example Modal"
      className="modal modal-top-10 success-mod"
      overlayClassName="overlay-err"
    >
      <div className="att-modal">
        <div className="flex">
          <img src="/images/tick.svg" />
          <span className="success-text att-text">
            Вы успешно добавили факультет
          </span>
        </div>
        <img onClick={props.closeModal} src="/images/close-button.svg" />
      </div>
    </Modal>
    <Modal
      isOpen={props.loading}
      contentLabel="Example Modal"
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <span>Подождите...</span>
      <Spinner />
    </Modal>
    <div className="p-save-clear-btn">
      <button onClick={props.onSubmit} className="btn-app-s btn-g">Сохранить</button>
      <button className="btn-app-s btn-b">Назад</button>
    </div>
  </div>

export default AddFacul;
