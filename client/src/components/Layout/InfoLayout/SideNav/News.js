import React from 'react';

const News = props =>

  <div className="charts-s-nav">
    <span className="s-nav-text">Ближайшие события</span><br />
    <div className="stats-s-nav">
      <img src="/images/kaznu.png" />
      <div className="stats-text">
        <div className="s-nav-text">День открытых дверей</div>
        <div className="stat-text-m">КазНУ им. Аль-фараби</div>
      </div>
    </div>
    <div className="stats-s-nav">
      <img src="/images/kaznu.png" />
      <div className="stats-text">
        <div className="s-nav-text">Встреча с Ректором</div>
        <div className="stat-text-m">КИМЭП</div>
      </div>
    </div>
    <div className="stats-s-nav">
      <img src="/images/kaznu.png" />
      <div className="stats-text">
        <div className="s-nav-text">Завершение приема заявок</div>
        <div className="stat-text-m">Университет Туран</div>
      </div>
    </div>
  </div>

export default News;
