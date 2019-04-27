import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';

import { fileserver, regions } from '../../../../constants';

const EditContact = props =>

  <Fragment>
    <div className="text-18 margin-t-10">Изменить профиль</div>
    <div className="p-photo">
      <div className="avatar">
        <img src={`http://${fileserver}:9999/${props.univer.univer.logo}`} />
      </div>
    </div>
    <div onClick={props.showModal} className="change-p-f"><img className="pencil" src="/images/pencil.svg" /><span className="g-sml-text">изменить</span></div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Название ВУЗа</span><br/>
        <input
          name="univer_name"
          value={props.univer_name}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Аббревиатура</span><br/>
        <input
          name="addreviation"
          value={props.addreviation}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Категория</span><br/>
        <input
          name="category"
          value={props.category}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Тип ВУЗа</span><br/>
        <input
          name="type"
          value={props.type}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Код ВУЗа</span><br/>
        <input
          name="univer_code"
          value={props.univer_code}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Номер лицензии</span><br/>
        <input
          name="license"
          value={props.license}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Годен до</span><br/>
        <DatePicker
          name="expire"
          selected={props.expire}
          onChange={props.handleDate}
          dateFormat="L"
          locale="ru-kz"
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
        <span className="app-text-bold">Адрес ВУЗа</span><br/>
        <input
          name="address"
          value={props.address}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Телефон</span><br/>
        <input
          name="phone"
          value={props.phone}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Электронная почта</span><br/>
        <input
          name="o_email"
          value={props.o_email}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-row">
        <span className="app-text-bold">Сайт</span><br/>
        <input
          name="website"
          value={props.website}
          onChange={props.onChange}
          placeholder="Не объязательное поле"
        />
      </div>
    </div>
    <div className="app-text-bold-div marg-t-20">Социальные сети</div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-flex app-100">
        <div className="social-icon"><img src="/images/fb.svg" /></div>
        <input
          name="fb"
          type="text"
          placeholder="Не объязательное поле"
          value={props.fb}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-flex app-100">
        <div className="social-icon"><img src="/images/insta.svg" /></div>
        <input
          name="insta"
          type="text"
          placeholder="Не объязательное поле"
          value={props.insta}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-flex app-100">
        <div className="social-icon"><img src="/images/twitter.svg" /></div>
        <input
          name="twitter"
          type="text"
          placeholder="Не объязательное поле"
          value={props.twitter}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-flex app-100">
        <div className="social-icon"><img src="/images/vk2.svg" /></div>
        <input
          name="vk"
          type="text"
          placeholder="Не объязательное поле"
          value={props.vk}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-flex app-100">
        <div className="social-icon"><img src="/images/youtube.svg" /></div>
        <input
          name="youtube"
          type="text"
          placeholder="Не объязательное поле"
          value={props.youtube}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-flex app-100">
        <div className="other-social-i-t">Другое</div>
        <input
          className="other-social-i"
          name="other"
          type="text"
          placeholder="Не объязательное поле"
          value={props.other}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="p-next-clear-btn-l long-f-b padding-t-20">
      <button onClick={props.onSubmit} className="btn-app-s btn-g">Сохранить</button>
      <button onClick={props.switchOff} className="btn-app-s btn-b">Отмена</button>
    </div>
  </Fragment>

export default EditContact;
