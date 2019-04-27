import React, { Fragment } from 'react';

const ModalForm = props =>

  <Fragment>
    <div className="modal-h"><span className="modal-h-t">Задать вопрос</span></div>
    <div className="modal-b">
      <span className="m-ta-text">Ваш вопрос</span>
      <textarea
        name="question"
        onChange={props.onChange}
        className="textarea"
      />
    <span className="g-sml-text">Перед тем как задать вопрос, убедитесь, что его не задали ранее</span>
    </div>
    <div className="p-modal-clear-btn-l">
      <button onClick={props.onSubmit} className="btn-app-s btn-bl">Отправить</button>
      <button onClick={props.closeModal} className="btn-app-s btn-b">Отменить</button>
    </div>
  </Fragment>

export default ModalForm;
