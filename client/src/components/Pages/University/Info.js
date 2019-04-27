import React from 'react';

import Composition from './Composition';
import { fileserver } from '../../../constants';

const Info = props =>

  <div className="u-info">
    <div className="u-block">
      <img className="big-image" src={`http://${fileserver}:9999/${props.univer.univer.wallpapper}`} />
    </div>
    {/*<div className="u-block u-s-block">
      <span className="h-text-c">ВУЗ в цифрах</span><br/>
      <span className="h-text-b">Данные за 2017 - 2018 учебный год</span>
      <div className="stat-u-block">
        <div className="stat-und-block">
          <span className="h-text-d">СТУДЕНТЫ</span><br/>
          <div className="h-figure-d">21751</div>
          <span className="h-text-d">Поступило: 3 762</span>
        </div>
        <div className="stat-und-block">
          <span className="h-text-d">ВЫПУСКНИКИ</span><br/>
          <div className="h-figure-d">3520</div>
          <span className="h-text-d">За все время: 42 369</span>
        </div>
        <div className="stat-und-block">
          <span className="h-text-d">ПРЕПОДАВАТЕЛИ</span><br/>
          <div className="h-figure-d">127</div>
          <span className="h-text-d">Уволили(сь): 13</span>
        </div>
      </div>
    </div>*/}
    <div className="desc-u-block">
      <Composition {...props} />
    </div>
  </div>

export default Info
