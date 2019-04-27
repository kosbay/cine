import React, { Fragment } from 'react';

const ModalForm = props =>

  <Fragment>
    <div className="modal-h"><span className="modal-h-t">Причина отказа</span></div>
    <div className="modal-b">
      <span className="m-ta-text">Комментарий</span>
      <textarea
        name="reason"
        onChange={props.onChange}
        className="textarea"
      />
    </div>
    <div className="p-modal-clear-btn-l">
      <button onClick={() => props.sendRefuse(props.apply[0]._id)} className="btn-app-s btn-bl">Отправить</button>
      <button onClick={props.closeModal} className="btn-app-s btn-b">Отменить</button>
    </div>
  </Fragment>

export default ModalForm;
