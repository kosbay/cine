import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Table = props =>

  <Fragment>
    {/*<div className="add-fac-btn m-ta-text"><img src="/images/plus.svg" /> Добавить новый факультет</div>*/}
    {
      props.fac.facs ?
        props.fac.facs.map(fac =>
          <table key={fac._id} className="table">
            <caption className="caption">
              <div className="text-18 float-l">{fac.fac_name}</div>
              <div onClick={() => props.onDeleteFac(fac._id)} className="cursor-p float-r"><span className="g-sml-text">Удалить факультет</span></div>
            </caption>
            <thead>
              <tr>
                <td>No.</td>
                <td>Наименование</td>
                <td>Подано заявок</td>
                <td>Действия</td>
              </tr>
            </thead>
            <tbody>
              {
                fac.specs ?
                  fac.specs.map((spec, i) =>
                    <tr key={spec._id}>
                      {
                        props.facs && props.edit_id === spec._id ?
                        <Fragment>
                          <td className="spec-code">
                            <input
                              className="code-input"
                              value={props.code}
                              name="code"
                              onChange={props.onChange}
                            />
                          </td>
                          <td className="spec-name">
                            <input
                              className="name-input"
                              value={props.spec_name}
                              name="spec_name"
                              onChange={props.onChange}
                            />
                          </td>
                          <td className="spec-app">
                            <input
                              className="code-input"
                              value={props.staff_1}
                              name="staff_1"
                              onChange={props.onChange}
                            />
                            <input
                              className="code-input"
                              value={props.staff_2}
                              name="staff_2"
                              onChange={props.onChange}
                            />
                          </td>
                          <td>
                            <ul className="desc-u-block-h-p-u">
                              <li>
                                <div onClick={() => props.saveSpec(spec._id)} className="edit-icon">
                                  <img src="/images/pencil.svg" />
                                </div>
                              </li>
                              <li>
                                <div onClick={props.closeEdit} className="edit-icon">
                                  <img src="/images/close-button.svg" />
                                </div>
                              </li>
                            </ul>
                          </td>
                        </Fragment> :
                        <Fragment>
                          <td className="spec-code">{spec.code}</td>
                          <td className="spec-name">{spec.name}</td>
                          <td className="spec-app">{spec.apps}</td>
                          <td>
                            <ul className="desc-u-block-h-p-u">
                              <li>
                                <div onClick={() => props.onEdit(spec)} className="edit-icon">
                                  <img src="/images/pencil.svg" />
                                </div>
                              </li>
                              <li>
                                <div onClick={() => props.onDeleteSpec(spec._id)} className="edit-icon">
                                  <img src="/images/trash.svg" />
                                </div>
                              </li>
                            </ul>
                          </td>
                        </Fragment>
                      }
                    </tr>
                  ) :
                <div className="text-18">Не добавлены факультеты</div>
              }
            </tbody>
          </table>
        ) :
      <div className="text-18">Не добавлены факультеты</div>
    }
  </Fragment>

export default Table;
