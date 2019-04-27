import React from 'react';
import { Link } from 'react-router-dom';

const Table = props =>

  <table className="table">
    <thead>
      <tr>
        <td>No.</td>
        <td>Наименование</td>
        <td>Проф. предмет 1</td>
        <td>Проф. предмет 2</td>
        <td>Подано заявок</td>
        <td>Действия</td>
      </tr>
    </thead>
    <tbody>
      {
        props.top_spec ?
          props.top_spec.map(spec =>
            <tr key={spec._id}>
              <td>{spec.code}</td>
              <td>{spec.name}</td>
              <td>{spec.staff_1}</td>
              <td>{spec.staff_2}</td>
              <td>{spec.apps}</td>
              <td>
                <Link to={`/student/university/${spec.univer._id}`}><button className="btn-info">Подробнее</button></Link>
                  <Link
                    to={
                      `/student/apply/${spec.univer.univer_name}/${spec.univer._id}/${spec.facultet.fac_name}/${spec.facultet._id}/${spec.name}/${spec._id}`
                    }
                  >
                    <button className="btn-app">Подать заявку</button>
                  </Link>
              </td>
            </tr>
          ) :
        null
      }
    </tbody>
  </table>

export default Table
