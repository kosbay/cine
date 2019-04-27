import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DropZone from 'react-dropzone';
import Inputmask from 'react-input-mask';

import { regions } from '../../../constants';

const Step = props =>

  <Fragment>
    <div className="page1">
      <div className="stat-v-text-t">ШАГ 6</div>
      <div className="u-c-text">Загрузить Аттестат и Сертификат о ЕНТ</div>
      <DropZone
        accept="image/jpg, image/jpeg"
        className={`dropzone ${ props.file5 ? 'dz-active' : null}`}
        onDrop={(accepted, rejected, name) => props.onDrop(accepted, rejected, 'file5')}
        onDragEnter={name => props.onDragEnter('file5')}
        onDragLeave={props.onDragLeave}
      >
        <div className="m-upl">
          {
            props.file5a.length > 0 ?
            <Fragment>
              <img src="/images/grade-ready.svg" /><br />
              <span className="stat-v-text">Загружено</span>
            </Fragment> :
              props.rejected.length > 0 ?
              <Fragment>
                <img src="/images/grade.svg" /><br />
                <span className="stat-v-text">Файлы должны быть в JPEG</span>
              </Fragment>
              :
              <Fragment>
                <img src="/images/grade.svg" /><br />
                <span className="stat-v-text">Перетащите файл сюда</span>
              </Fragment>
          }
          <br />
          <button className="upl-btn">Выберите файл</button>
        </div>
      </DropZone>
    </div>

    <div className="page1">
      <div className="u-c-text">Информация о школе</div>
      <p className="stat-v-text-t marg-t-20">
        Информация о студенте необходима для анализа данных об абитуриентах, их перемещению по стране и для составления рейтинга
        популярности университетов при его выборе. Информация используется МОН РК и не подлежит распространению третьим лицам.
      </p>
      <div className="app-form-stp1 marg-t-20">
        <div className="app-form-row">
          <span className="app-text-bold">Название школы</span><br/>
          <input
            name="school_name"
            value={props.school_name}
            onChange={props.onChange}
          />
        </div>
        <div className="app-form-row">
          <span className="app-text-bold">Номер школы</span><br/>
          <input
            name="num_of_school"
            value={props.num_of_school}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20">
        <div className="app-form-row">
          <span className="app-text-bold">Адрес</span><br/>
          <input
            name="address"
            value={props.address}
            onChange={props.onChange}
          />
        </div>
        <div className="app-form-row">
          <div className="flex-j">
            <span className="app-text-bold">Город</span><br/>
            <span className="app-text-bold">Область</span><br/>
            <span className="app-text-bold">Индекс</span><br/>
          </div>
          <div className="flex-j">
            <select
              className="select-c"
              name="city"
              onChange={props.onChange}
              defaultValue="0"
            >
              <option value="0" disabled>Выберите город</option>
              {
                regions.map((region, i) =>
                  <option key={i} value={region.city}>
                    {region.city}
                  </option>
                )
              }
            </select>
            <input
              name="region"
              value={props.region}
              onChange={props.onChange}
              className="a-i-sh"
            />
            <input
              name="index"
              value={props.index}
              onChange={props.onChange}
              className="a-i-sh"
            />
          </div>
        </div>
      </div>
    </div>

    <div id="paymentForm" className="page1">
      <div className="u-c-text">Оплата</div>
      <p className="stat-v-text-t marg-t-20">
        Информация о студенте необходима для анализа данных об абитуриентах, их перемещению по стране и для составления рейтинга
        популярности университетов при его выборе. Информация используется МОН РК и не подлежит распространению третьим лицам.
      </p>
      <div className="app-form-stp1 marg-t-20">
        <div className="app-form-row half-width">
          <span className="app-text-bold">Номер карты</span><br/>
          <Inputmask
            {...props}
            type="text"
            onChange={e => props.onCardChange(e, 'card_number')}
            data-cp="cardNumber"
            mask="9999 9999 9999 9999"
          />
        </div>
      </div>
      <div className="app-form-stp1 marg-t-20">
        <div className="app-form-row">
          <span className="app-text-bold">ФИО</span><br/>
            <Inputmask
              {...props}
              type="text"
              onChange={e => props.onCardChange(e, 'card_name')}
              data-cp="name"
            />
        </div>
        <div className="app-form-row">
          <div className="flex-j">
            <span className="app-text-bold">Месяц</span><br/>
            <span className="app-text-bold">Год</span><br/>
            <span className="app-text-bold">CVV</span><br/>
          </div>
          <div className="flex-j">
            <Inputmask
              {...props}
              type="text"
              onChange={e => props.onCardChange(e, 'exp_date_month')}
              data-cp="expDateMonth"
              mask="99"
            />
            <Inputmask
              {...props}
              className="inpt-mask"
              type="text"
              onChange={e => props.onCardChange(e, 'exp_date_year')}
              data-cp="expDateYear"
              mask="99"
            />
            <Inputmask
              {...props}
              className="inpt-mask"
              type="text"
              onChange={e => props.onCardChange(e, 'cvv')}
              data-cp="cvv"
              mask="999"
            />
          </div>
        </div>
      </div>
    </div>
  </Fragment>




export default Step;
