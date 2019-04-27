import React from 'react';

const Stats1 = props =>

  <div className="stats-for-un width70per">
    <div>
      <div className="s-nav-text padd-b5">Статистика абитуриентов</div>
      <div className="g-sml-text padd-b5">За Июнь 2017 (обновлено 2 дня назад)</div>
    </div>
    <div className="stat-u-block">
      <div className="stat-und-block">
        <span className="g-mid-text">ПОДАНО ЗАЯВОК</span><br/>
        <div className="b-big-text">312</div>
        <span className="g-mid-text">Сегодня 8 заявок</span>
      </div>
      <div className="stat-und-block">
        <span className="g-mid-text">Принято</span><br/>
        <div className="b-big-text">3520</div>
        <span className="g-mid-text">За все время: 42 369</span>
      </div>
      <div className="stat-und-block">
        <span className="g-mid-text">ПРЕПОДАВАТЕЛИ</span><br/>
        <div className="b-big-text">127</div>
        <span className="g-mid-text">Прошлый месяц: 12</span>
      </div>
    </div>
  </div>

export default Stats1;
