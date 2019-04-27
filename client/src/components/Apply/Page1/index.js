import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import DropZone from 'react-dropzone'
import DatePicker from 'react-datepicker'
import InputMask from 'react-input-mask';
import 'react-datepicker/dist/react-datepicker.css'

class Step extends Component {

  render() {

    let options;
    let options2;
    let options3;

    if(this.props.univer.univers) {
      options = this.props.univer.univers.map(univer => (
        {
          value: univer._id,
          label: univer.univer_name
        }
      ))
    }

    if(this.props.fac.facs) {
      options2 = this.props.fac.facs.map(facs => (
        {
          value: facs._id,
          label: facs.fac_name
        }
      ))
    }

    if(this.props.fac.specs) {
      options3 = this.props.fac.specs.map(specs => (
        {
          value: specs._id,
          label: specs.name
        }
      ))
    }

    const colourStyles = {
      control: styles => ({ ...styles, backgroundColor: 'white', color: '#7F8FA4', height: 5, marginTop: 5, fontSize: 14 }),
      option: styles => ({ ...styles, fontSize: 14 })
    }

    return(
      <Fragment>

        <div className="page1">
          <div className="u-c-text">Информация о себе</div>
          <p className="stat-v-text-t marg-t-20">
            Информация о себе необходима для анализа данных об абитуриентах, их перемещению по стране и для составления рейтинга
            популярности университетов при его выборе. Информация используется МОН РК и не подлежит распространению третьим лицам.
          </p>
          <div className="app-form-stp1 marg-t-20">
            <div className="app-form-row">
              <span className="app-text-bold">Фамилия</span><br/>
              <input
                name="lastname"
                value={this.props.lastname}
                onChange={this.props.onChange}
              />
            </div>
            <div className="app-form-row">
              <span className="app-text-bold">Имя</span><br/>
              <input
                name="firstname"
                value={this.props.firstname}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="app-form-stp1 marg-t-20">
            <div className="app-form-row">
              <span className="app-text-bold">Очество</span><br/>
              <input
                name="fathername"
                value={this.props.fathername}
                onChange={this.props.onChange}
              />
            </div>
            <div className="app-form-row">
              <div className="flex">
                <div>
                  <span className="app-text-bold">Пол</span><br/>
                  <select
                    name="sex"
                    className="select"
                    onChange={this.props.onChange}
                    defaultValue={this.props.sex}
                  >
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                  </select>
                </div>
                <div>
                  <span className="app-text-bold">Дата рождения</span><br/>
                  <DatePicker
                    name="expire"
                    className="datepicker"
                    selected={this.props.born_date}
                    onChange={this.props.handleBornDate}
                    dateFormat="L"
                    locale="ru-kz"
                    customInput={
                        <InputMask
                            className="inpt-mask"
                            type="text"
                            mask="99.99.9999"
                        />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page1">
          <div className="stat-v-text-t">ШАГ 1</div>
          <div className="u-c-text">Вуз. Факультет. Специальность</div>
          <p className="stat-v-text-t marg-t-20">
            Информация о Вузе необходима для анализа данных об абитуриентах, их перемещению по стране и для составления рейтинга
            популярности университетов при его выборе. Информация используется МОН РК и не подлежит распространению третьим лицам.
          </p>
          <div className="app-form-stp1 marg-t-20">
            <div className="app-form-row">
              <span className="app-text-bold">Учебное заведение</span><br/>
              <Select
                name="univer"
                placeholder="Выбертите ВУЗ"
                styles={colourStyles}
                value={{ value: this.props.univer_id, label: this.props.univer_name }}
                options={options}
                onChange={this.props.handleUniver}
              /><br />
              <span className="app-text-bold">Факультет</span><br/>
              <Select
                name="facultet"
                placeholder="Выбертите факультет"
                styles={colourStyles}
                value={{ value: this.props.facultet_id, label: this.props.facultet }}
                options={options2}
                onChange={this.props.handleFac}
              /><br/>
              <span className="app-text-bold">Специализация</span><br/>
              <Select
                name="specialization"
                placeholder="Выбертите специальность"
                styles={colourStyles}
                value={{ value: this.props.special_id, label: this.props.special }}
                options={options3}
                onChange={this.props.handleSpec}
              /><br />
            </div>
          </div>
        </div>

        <div className="page1">
          <div className="stat-v-text-t">ШАГ 2</div>
          <div className="u-c-text">Загрузить Удостоверение личности</div>
          <DropZone
            accept="image/jpg, image/jpeg"
            className={`dropzone ${ this.props.file1 ? 'dz-active' : null}`}
            onDrop={(accepted, rejected, name) => this.props.onDrop(accepted, rejected, 'file1')}
            onDragEnter={name => this.props.onDragEnter('file1')}
            onDragLeave={this.props.onDragLeave}
          >
            <div className="m-upl">
              {
                this.props.file1a.length > 0 ?
                <Fragment>
                  <img src="/images/ID-ready.svg" /><br />
                  <span className="stat-v-text">Загружено</span>
                </Fragment> :
                  this.props.rejected.length > 0 ?
                  <Fragment>
                    <img src="/images/ID.svg" /><br />
                    <span className="stat-v-text">Файлы должны быть в JPEG</span>
                  </Fragment>
                  :
                  <Fragment>
                    <img src="/images/ID.svg" /><br />
                    <span className="stat-v-text">Перетащите файл сюда</span>
                  </Fragment>
              }
              <br/>
              <button className="upl-btn">Выберите файл</button>
            </div>
          </DropZone>
        </div>

        <div className="page1">
          <div className="stat-v-text-t">ШАГ 3</div>
          <div className="u-c-text">Загрузить фото 3х4</div>
          <DropZone
            accept="image/jpg, image/jpeg"
            className={`dropzone ${ this.props.file2 ? 'dz-active' : null}`}
            onDrop={(accepted, rejected, name) => this.props.onDrop(accepted, rejected, 'file2')}
            onDragEnter={name => this.props.onDragEnter('file2')}
            onDragLeave={this.props.onDragLeave}
          >
            <div className="m-upl">
              {
                this.props.file2a.length > 0 ?
                  <Fragment>
                    <img src="/images/Photo-ready.svg" /><br />
                    <span className="stat-v-text">Загружено</span>
                  </Fragment> :
                    this.props.rejected.length > 0 ?
                    <Fragment>
                      <img src="/images/Photo.svg" /><br />
                      <span className="stat-v-text">Файлы должны быть в JPEG</span>
                    </Fragment>
                  :
                  <Fragment>
                    <img src="/images/Photo.svg" /><br />
                    <span className="stat-v-text">Перетащите файл сюда</span>
                  </Fragment>
              }
              <br />
              <button className="upl-btn">Выберите файл</button>
            </div>
          </DropZone>
        </div>
        <div className="p-next-clear-btn">
          <button onClick={this.props.nextPage} className="btn-app-s btn-g">Далее</button>
          <button className="btn-app-s btn-b">Назад</button>
        </div>
      </Fragment>
    )
  }
}

export default Step
