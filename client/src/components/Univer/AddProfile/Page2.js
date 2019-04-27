import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DropZone from 'react-dropzone';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import GoogleMap from './GoogleMap';

import { regions } from '../../../constants';

const Step = props =>

  <Fragment>
    <div className="page3">
      <div className="u-c-text">Контактная информация</div>
      <p className="stat-v-text-t">
        Заполните данные об учебном заведении
      </p>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-row">
          <span className="app-text-bold">Город</span><br/>
          <select
            className="select-r"
            name="region"
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
          {props.errors.region && <span className="val-error"><img src="/images/error.svg" />{props.errors.region}</span>}
        </div>
        <div className="app-form-row">
          <span className="app-text-bold">Адрес ВУЗа</span><br/>
          <input
            name="address"
            value={props.address}
            onChange={props.onChange}
          />
          {props.errors.address && <span className="val-error"><img src="/images/error.svg" />{props.errors.address}</span>}
        </div>
      </div>
      <GoogleMap
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfPvKrVvV2HltGpO_tkVP1JbyIi_gdSZU&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `200px` }} />}
        mapElement={<div style={{ height: `100%`, width: `78%`, marginTop: `20px` }} />}
        onMap={props.onMap}
      />
      <p className="stat-v-text-t">
        Укажите местоположение на карте
      </p>
      <div className="hr"></div>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-row">
          <span className="app-text-bold">Телефон</span><br/>
          <input
            name="phone"
            value={props.phone}
            onChange={props.onChange}
          />
        {props.errors.phone && <span className="val-error"><img src="/images/error.svg" />{props.errors.phone}</span>}
        </div>
        <div className="app-form-row">
          <span className="app-text-bold">Электронная почта</span><br/>
          <input
            name="o_email"
            value={props.o_email}
            onChange={props.onChange}
          />
        {props.errors.o_email && <span className="val-error"><img src="/images/error.svg" />{props.errors.o_email}</span>}
        </div>
        <div className="app-form-row">
          <span className="app-text-bold">Сайт</span><br/>
          <input
            name="website"
            type="text"
            placeholder={props.placeholder}
            value={props.website}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="app-text-bold-div marg-t-20">Социальные сети</div>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-flex app-66">
          <div className="social-icon"><img src="/images/fb.svg" /></div>
          <input
            name="fb"
            type="text"
            placeholder={props.placeholder}
            value={props.fb}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-flex app-66">
          <div className="social-icon"><img src="/images/insta.svg" /></div>
          <input
            name="insta"
            type="text"
            placeholder={props.placeholder}
            value={props.insta}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-flex app-66">
          <div className="social-icon"><img src="/images/twitter.svg" /></div>
          <input
            name="twitter"
            type="text"
            placeholder={props.placeholder}
            value={props.twitter}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-flex app-66">
          <div className="social-icon"><img src="/images/vk2.svg" /></div>
          <input
            name="vk"
            type="text"
            placeholder={props.placeholder}
            value={props.vk}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-flex app-66">
          <div className="social-icon"><img src="/images/youtube.svg" /></div>
          <input
            name="youtube"
            type="text"
            placeholder={props.placeholder}
            value={props.youtube}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20 width-form">
        <div className="app-form-flex app-66">
          <div className="other-social-i-t">Другое</div>
          <input
            className="other-social-i"
            name="other"
            type="text"
            placeholder={props.placeholder}
            value={props.other}
            onChange={props.onChange}
          />
        </div>
      </div>
    </div>

    <div className="p-next-clear-btn-l">
      <button disabled={props.disabled ? props.disabled : ''} className="btn-app-s btn-g" onClick={props.onSubmit}>Сохранить</button>
      <button onClick={props.onClear} className="btn-app-s btn-b">Очистить</button>
    </div>
  </Fragment>

export default Step;
