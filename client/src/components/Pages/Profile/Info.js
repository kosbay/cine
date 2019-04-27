import React from 'react';
import DatePicker from 'react-datepicker';

import { fileserver, regions } from '../../../constants';

const Info = props =>

  <div className="profile">
    <span className="text-18">Личная информация</span>
    <div className="p-photo">
      <div className="avatar">
        <img src={`http://${fileserver}:9999/${props.auth.user.avatar}`} />
      </div>
    </div>
    <div className="change-p-f"><img className="pencil" src="/images/pencil.svg" /><span className="g-sml-text">изменить</span></div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Фамилия</span><br/>
        <input
          name="lastname"
          value={props.lastname}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Имя</span><br/>
        <input
          name="firstname"
          value={props.firstname}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Отчество</span><br/>
        <input
          name="fathername"
          value={props.fathername}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Дата рождения</span><br/>
        <DatePicker
          name="bornDate"
          selected={props.bornDate}
          onChange={props.handleDate}
          dateFormat="L"
          locale="ru-kz"
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Название школы</span><br/>
        <input
          name="school_name"
          value={props.school_name}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Номер школы</span><br/>
        <input
          name="school_number"
          value={props.school_number}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Город</span><br/>
          <select
            className="select-r"
            name="region"
            value={props.region}
            onChange={props.onChange}
          >
            <option default>Выберите город</option>
            {
              regions.map((region, i) =>
                <option key={i} value={region.city}>
                  {region.city}
                </option>
              )
            }
          </select>
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Адрес проживания</span><br/>
        <input
          name="address"
          value={props.address}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Индекс</span><br/>
        <input
          name="index"
          value={props.index}
          onChange={props.onChange}
        />
      </div>
    </div>
    <button onClick={props.onSubmit} className="btn-app-b marg-t-20">Сохранить</button>
  </div>

export default Info;
