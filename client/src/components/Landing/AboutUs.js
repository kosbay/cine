import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import GoogleMap from './GoogleMap';
import Carousel from './Carousel';
import PieCharts from './PieCharts';

const Landing = props =>

  <Fragment>
    <div className="head">
      <div className="header__inner">
        <div className="header__logo">
          <Link to="/"><img src="./images/widgets/logo.svg"/></Link>
        </div>
      </div>
    </div>
    <section className="main">
      <div className="main__bgi">
        <img src="./images/widgets/main.png"/>
      </div>
      <div className="main__inner">
        <div className="main__inner_title">

        </div>
        <div className="main__inner_description">
          One Life - это новая система автоматизации управления академическим процессом.
          Система позволяет мониторить учебный процесс в университете, следить за успеваемостью каждого студента,
          а также дает полный отчет о состоянии академического процесса.
        </div>
      </div>
    </section>
    <section className="advantages">
      <div className="advantages__inner">
        <div className="advantages__inner__description centr">ТОО Micro One</div>
        <p className="wrapper__link_description mb-70">
            Мы занимаемся автоматизацией приемной комиссии и учебных процессов
            в ВУЗах и колледжах.<br />
            Также в деятельность нашей компании входит консалтинг в научной
            сфере, автоматизация НИИ, аналитическая работа с различными
            научными организациями, их автоматизация, а также популяризация
            научных исследований и трудов.
        </p>
      </div>
    </section>
    <section className="advantages">
      <div className="advantages__inner">
        <div className="advantages__inner_wrapper">
          <div className="wrapper__link">
            <img className="icon-plh" src="./images/placeholder.svg"/>
            <p className="wrapper__link_title">Адрес</p>
            <p className="wrapper__link_description">050059, г. Алматы, мкр. Самал-2, д.58, офис 16, БЦ "Сәтті"</p>
          </div>
          <div className="wrapper__link">
            <img className="icon-plh" src="./images/phone-book.svg"/>
            <p className="wrapper__link_title">Контакты</p>
            <p className="wrapper__link_description">моб.: +7 (707) 981 78 61 micro.one.project@gmail.com<br />onelife.systems</p>
          </div>
          <div className="wrapper__link">
            <img className="icon-plh" src="./images/earth-globe.svg"/>
            <GoogleMap
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfPvKrVvV2HltGpO_tkVP1JbyIi_gdSZU&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
              containerElement={<div style={{ height: `100px`, width: `100%` }} />}
              mapElement={<div style={{ height: `100%`, width: `100%`, marginTop: `20px` }} />}
            />
          </div>
        </div>
      </div>
    </section>
    <section className="logos">
      <div className="advantages__inner__description centr">Наши партнеры</div>
      <div className="logos__inner">
        <div className="logos__inner_img"><img src="./images/Болашак-лого.png"/></div>
        <div className="logos__inner_img"><img src="./images/enu_logo_eng.png"/></div>
        <div className="logos__inner_img"><img src="./images/Group.svg"/></div>
        <div className="logos__inner_img"><img src="./images/2.png"/></div>
        <div className="logos__inner_img"><img src="./images/197.png"/></div>
      </div>
    </section>
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__inner_logo">
          <img src="./images/widgets/logo.svg"/>
        </div>
        <div className="footer__inner_social">
          <div className="footer__social">
            <img src="./images/widgets/facebook.svg"/>
            <img src="./images/widgets/insta.svg"/>
            <img src="./images/widgets/msg.svg"/>
          </div>
          <p className="footer__social_text">© 2018 One Life. Все права защищены.</p>
        </div>
        <div className="footer__inner_info">
          <span>+7 (701) 2703444</span> <br/> Работаем с 10:00 -  20:00
        </div>
      </div>
    </footer>
  </Fragment>

export default Landing;
