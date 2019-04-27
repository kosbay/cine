import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const login = () => {
  axios
    .get(`http://localhost:3000/auth/google`, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:3000/" }
    })
    .then(res => console.log("Ok"))
    .catch(err => console.log("Error", err));
};
const Registration = props => (
  <div className="registration">
    <div className="reg-h-t-b flex">
      <div
        onClick={() => props.changeRole("student")}
        className={`reg-h-b ${
          props.role === "student" ? null : "reg-h-b-clicked"
        }`}
      >
        <span className="modal-h-t">Студент</span>
      </div>
      <div
        onClick={() => props.changeRole("univer")}
        className={`reg-h-b ${
          props.role === "univer" ? null : "reg-h-b-clicked-2"
        }`}
      >
        <span className="modal-h-t">Университет</span>
      </div>
    </div>
    <div className="card-auth">
      <form onSubmit={props.onSubmit}>
        <div className="r-i-block">
          <label>Электронная почта</label>
          <br />
          <input
            type="text"
            name="email"
            value={props.email}
            onChange={props.onChange}
            className="r-f-input"
            placeholder="example@mail.com"
          />
          {props.errors.email && (
            <span className="val-error">
              <img src="/images/error.svg" />
              {props.errors.email}
            </span>
          )}
        </div>
        <div className="r-i-block">
          <label>Пароль</label>
          <br />
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={props.onChange}
            className="r-f-input"
            placeholder="Введите пароль"
          />
          {props.errors.password && (
            <span className="val-error">
              <img src="/images/error.svg" />
              {props.errors.password}
            </span>
          )}
        </div>
        <div className="r-i-block">
          <label>Повторите пароль</label>
          <br />
          <input
            type="password"
            name="password2"
            value={props.password2}
            onChange={props.onChange}
            className="r-f-input"
            placeholder="Введите пароль"
          />
          {props.errors.password2 && (
            <div className="val-error">
              <img src="/images/error.svg" />
              {props.errors.password2}
            </div>
          )}
        </div>
        <div className="r-i-checkbox r-i-block">
          <input type="checkbox" />
          <label>Запомнить меня</label>
        </div>
        <div className="r-i-block">
          <button className="reg-btn">Зарегистрироваться</button>
        </div>
      </form>
      <p className="r-f-text">
        Нажимая «Зарегистрироваться», вы подтверждаете, что ознакомлены и
        полностью согласны с условиями использования сайта.
      </p>
      <p className="r-footer-text">
        У Вас уже есть аккаунт на One Life? <Link to="/auth/login"> Войти</Link>
      </p>
      <div className="s-i-block">
        <div className="fb s-btn">
          <img className="s-icon" src="/images/facebook.svg" />
          <span>Войти с помощью Facebook</span>
        </div>
        <div className="g s-btn" onClick={login}>
          <img className="s-icon" src="/images/google-plus.svg" />
          <span>Войти с помощью Google</span>
        </div>
        <div className="vk s-btn">
          <img className="s-icon" src="/images/vk.svg" />
          <span>Войти с помощью Вконтакте</span>
        </div>
      </div>
    </div>
  </div>
);

export default Registration;
