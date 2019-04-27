import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';

import Review from './Review';

const Reviews = props =>

  <Fragment>
    <div className="help-page">
      <div className="head-jc-sb">
        <div className="text-18">Отзывы ({props.reviews.count ? props.reviews.count : 0})</div>
        <button onClick={props.openModal} className="btn-app-b">Оставить отзыв</button>
      </div>
      {
        props.reviews.revs ?
          props.reviews.revs.map(rev =>
            <Review key={rev._id} {...rev} />
          )
         :
        null
      }
    </div>
  </Fragment>

export default Reviews;
