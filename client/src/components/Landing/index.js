import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Carousel from './Carousel';
import PieCharts from './PieCharts';

// <div className="wrapper__link">
//   <img src="./images/widgets/icon2.svg"/>
//   <p className="wrapper__link_title">Преподавателям</p>
//   <p className="wrapper__link_description">Эффективная система для создания расписаний, онлайн экзаменов. Проведение опроса и выставление оценок с любого устройства</p>
// </div>


const Landing = props =>

  <Fragment>
    <div className="head">
      <div className="header__inner">
        <div className="header__logo">
          <img src="./images/widgets/logo.svg"/>
        </div>
        <div className="header__nav">
          <div className="nav__link"><Link to ="/auth/login">Войти</Link></div>
          <div className="nav__link"><Link to ="/auth/registration/0">Регистрация</Link></div>
          <div className="nav__link"><Link to ="/conf">Конфиденциальность</Link></div>
          <div className="nav__link"><Link to ="/about_company">О нас</Link></div>
        </div>
      </div>
    </div>
    <section className="main">
      <div className="main__bgi">
        <img src="./images/widgets/main.png"/>
      </div>
      <div className="main__inner">
        <div className="main__inner_title">
          One Life - подавай заявку быстро и легко
        </div>
        <div className="main__inner_description">
          One Life - это новая система автоматизации управления академическим процессом.
          Система позволяет мониторить учебный процесс в университете, следить за успеваемостью каждого студента,
          а также дает полный отчет о состоянии академического процесса.
        </div>
        <div className="main__inner_form">
          {/*<input type="text" placeholder="Ваше Имя" className="first__input w-text-16"/>*/}
          <input name="email" onChange={props.onChange} type="text" placeholder="Электронная почта" className="second__input w-text-16"/>
          <Link to={`/auth/registration/${props.email}`}>
            <button style={{ height: '100%' }} className="btn">
              <span className="w-text-16">Подать заявку</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
    <section className="advantages">
      <div className="advantages__inner">
        {/*<div className="advantages__inner__description">Наши преимущества</div>*/}
        <div className="advantages__inner_wrapper">
          <div className="wrapper__link wrapper__link_left" >
            <img src="./images/hat.svg"/>
            <p className="wrapper__link_title">Студентам</p>
            <p className="wrapper__link_description">Мониторинг оценок, посещаемости и успеваемости. Возможность задать вопрос преподавателю онлайн</p>
          </div>
        </div>
      </div>
    </section>
    <section className="university">
      <div className="university__inner">
          <div className="advantages__inner__description centr padding-30">Университеты</div>
          {/*<div className="university__inner_btns">
            <div className="red"><img src="./images/widgets/back.svg"/></div>
            <div className="red"><img src="./images/widgets/next.svg"/></div>
          </div>*/}
        <Carousel {...props} />
      </div>
    </section>
    {/*<section className="information">
      <div className="information__bgi">
        <img src="./images/widgets/bgi.png "/>
      </div>
      <div className="information__inner">
        <PieCharts />
      </div>
    </section>*/}
    {/*<section className="students">
      <div className="students__inner">
        <div className="students__inner_img">
          <img className="mini__img" src="./images/widgets/cris.png"/>
          <img className="mini__img" src="./images/widgets/necris.png"/>
          <img className="mini__img" src="./images/widgets/1.png"/>
          <img className="mini__img" src="./images/widgets/2.png"/>
          <img className="mini__img" src="./images/widgets/3.png"/>
          <img className="mini__img" src="./images/widgets/4.png"/>
          <img className="mini__img" src="./images/widgets/5.png"/>
          <img className="mini__img" src="./images/widgets/6.png"/>
          <img className="mini__img" src="./images/widgets/7.png"/>
          <img className="mini__img" src="./images/widgets/8.png"/>
          <img className="mini__img" src="./images/widgets/9.png"/>
          <img className="mini__img" src="./images/widgets/10.png"/>
          <img className="mini__img" src="./images/widgets/11.png"/>
          <img className="mini__img" src="./images/widgets/12.png"/>
          <img className="mini__img" src="./images/widgets/13.png"/>
          <img className="mini__img" src="./images/widgets/14.png"/>
          <img className="mini__img" src="./images/widgets/15.png"/>
          <img className="mini__img" src="./images/widgets/16.png"/>
          <img className="mini__img" src="./images/widgets/17.png"/>
          <img className="mini__img" src="./images/widgets/18.png"/>
          <img className="mini__img" src="./images/widgets/19.png"/>
          <img className="mini__img" src="./images/widgets/20.png"/>
          <img className="mini__img" src="./images/widgets/21.png"/>
          <img className="mini__img" src="./images/widgets/22.png"/>
          <img className="mini__img" src="./images/widgets/23.png"/>
          <img className="mini__img" src="./images/widgets/24.png"/>
          <img className="mini__img" src="./images/widgets/25.png"/>
          <img className="mini__img" src="./images/widgets/26.png"/>
          <img className="mini__img" src="./images/widgets/27.png"/>
          <img className="mini__img" src="./images/widgets/28.png"/>
          <img className="mini__img" src="./images/widgets/29.png"/>
          <img className="mini__img" src="./images/widgets/30.png"/>
        </div>
        <div className="students__inner_text">
          <p className="students__text">Присоединиться к 29 103</p>
          <p className="students__desc">студентам</p>
          <button className="students__btn">Присоединиться</button>
        </div>
      </div>
    </section>*/}

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
            <img style={{ height: "30px" }} src="./images/logo-small.png"/>
            <img style={{ height: "30px" }} src="./images/vbv.png"/>
            <img style={{ height: "30px" }} src="./images/mastercard-securecode.png"/>
          </div>
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
