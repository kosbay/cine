import React, { Fragment } from 'react';

const EditDesc = props =>

  <Fragment>
    <div className="app-form-stp1 marg-t-20">
      <div className="app-form-rowl width-form-f">
        <span className="app-text-bold">Описание</span><br/>
        <textarea
          className="textarea"
          name="des"
          value={props.des}
          onChange={props.onChange}
        />
      </div>
    </div>
    <div className="p-next-clear-btn-l long-f-b padding-t-20">
      <button onClick={props.saveDesc} className="btn-app-s btn-g">Сохранить</button>
      <button onClick={props.closeEdit} className="btn-app-s btn-b">Отмена</button>
    </div>
  </Fragment>

export default EditDesc;
