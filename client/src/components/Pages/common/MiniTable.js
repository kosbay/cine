import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Table = props =>

  <Fragment>
    {
      props.fac.facs ?
        props.fac.facs.map(fac =>
          <table key={fac._id} className="table">
            <caption className="caption"><span className="text-18">{fac.fac_name}</span></caption>
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
                      <td>{i + 1}</td>
                      <td className="spec-name">{spec.name}</td>
                      <td>{spec.apps}</td>
                      <td>
                        <Link
                          to={
                            `/student/apply/${props.univer.univer.univer_name}/${props.univer.univer._id}/${fac.fac_name}/${fac._id}/${spec.name}/${spec._id}`
                          }
                        >
                          <button className="btn-app">Подать заявку</button>
                        </Link>
                      </td>
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
