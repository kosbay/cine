import React, { Fragment } from 'react';

import { fileserver } from '../../../constants';

const AppliesList = props =>

  <div className="table-wrapper">
    <div className="text-18 padding-b-20">Поданные заявки</div>
    <table className="table">
      <thead>
        <tr>
          <td></td>
          <td>Название университета</td>
          <td>Специальность</td>
          <td>Статус заявки</td>
        </tr>
      </thead>
      <tbody>
        {
          props.apply && props.apply.length > 0 ?
            props.apply.map(app =>
              <tr key={app._id}>
                {
                  app.univer_id ?
                  <Fragment>
                    <td><img className="p-u-icon" src={`http://${fileserver}:9999/${app.univer_id.logo}`} /></td>
                    <td>{app.univer_id.addreviation}</td>
                    <td>{app.special_id ? app.special_id.name : null}</td>
                    <td className={app.approved ? 'approved' : app.refuse ? 'refuse' : 'wait'}>{app.approved ? 'Принято' : app.refuse ? 'Отказано' : 'На рассмотрении'}</td>
                  </Fragment>
                  : null
              }
              </tr>
            ) :
          null
        }
      </tbody>
    </table>
  </div>

export default AppliesList;
