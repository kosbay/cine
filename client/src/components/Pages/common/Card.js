import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Rating from './Rating';
import { fileserver } from '../../../constants';

const Card = props =>

  <div className='card'>
    <Link to={`/student/university/${props._id}`}>
      <div className="card-img">
        <img src={`http://${fileserver}:9999/${props.wallpapper}`}/>
      </div>
    </Link>
    <div className="card-name">
      <span>{props.addreviation}</span>
      <div className="flex js-c">
        <div className="text-wrap">
          <span className="g-mid-text-2">{props.location.region}</span>
        </div>
        <Rating />
      </div>
    </div>
    <div className="card-stats">
      <div className="card-stats-b">
        <div className="stats-values">
          <div className="stat-value">150</div>
          <div className="stat-value">Заявок</div>
        </div>
        <div className="stats-values">
          <div className="stat-value">150</div>
          <div className="stat-value">Грантов</div>
        </div>
        <div className="stats-values">
          <div className="stat-value">150</div>
          <div className="stat-value">Студентов</div>
        </div>
      </div>
    </div>
  </div>

export default Card
