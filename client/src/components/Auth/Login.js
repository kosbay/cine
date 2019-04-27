import React from 'react'
import { Link } from 'react-router-dom'

// <div className="s-i-block">
//   <div className="fb s-btn"><img className="s-icon" src="/images/facebook.svg" /><span>Войти с помощью Facebook</span></div>
//   <div className="g s-btn"><img className="s-icon" src="/images/google-plus.svg" /><span>Войти с помощью Google</span></div>
//   <div className="vk s-btn"><img className="s-icon" src="/images/vk.svg" /><span>Войти с помощью Вконтакте</span></div>
// </div>

const Login = props =>

  <div className="registration">
    <div className="card-auth-2">
      <div className="reg-h-t-b-l">
        <div className="reg-h-t">Войти в систему</div>
      </div>
      <form onSubmit={props.onSubmit}>
        <div className="r-i-block">
          <label>Электронная почта</label><br />
          <input
            type="text"
            name="email"
            value={props.email}
            onChange={props.onChange}
            className="r-f-input"
            placeholder="example@mail.com"
          />
        {props.errors.email && <span className="val-error"><img src="/images/error.svg" />{props.errors.email}</span>}
        </div>
        <div className="r-i-block">
          <label>Пароль</label><br />
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={props.onChange}
            className="r-f-input"
            placeholder="Введите пароль"
          />
        {props.errors.password && <span className="val-error"><img src="/images/error.svg" />{props.errors.password}</span>}
        </div>
        <div className="r-i-checkbox r-i-block">
          <input
            type="checkbox"
            name="remember_me"
          />
          <label>Запомнить меня</label>
        </div>
        <div className="r-i-block">
          <button className="reg-btn">Войти</button>
        </div>
      </form>
      <div className="f-i-block">
        <p className="r-f-text forgot">
          <Link to="/auth/reset">Забыли пароль?</Link>
        </p>
      </div>
      <p className="r-footer-text">
        Не зарегистрированы на One Life?  <Link to="/auth/registration/'0'">Зарегистрироваться</Link>
      </p>
    </div>
  </div>

export default Login
