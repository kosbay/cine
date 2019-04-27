import React, { Fragment } from 'react';

import Rating from './Rating';

const ModalForm = props =>

  <Fragment>
    <div className="modal-h"><span className="modal-h-t">Задать вопрос</span></div>
    <div className="modal-b">
      <span className="m-ta-text">Ваш вопрос</span>
      <textarea
        name="review"
        onChange={props.onChange}
        className="textarea2"
      />
    {props.errors.review && <div><span className="val-error"><img src="/images/error.svg" />{props.errors.review}</span><br /></div>}
    <span className="g-sml-text">Рейтинг</span><br />
    <Rating {...props} />
    </div>
    <div className="p-modal-clear-btn-l">
      <button onClick={props.onReview} className="btn-app-s btn-bl">Отправить</button>
      <button onClick={props.closeModal} className="btn-app-s btn-b">Отменить</button>
    </div>
  </Fragment>

export default ModalForm;
