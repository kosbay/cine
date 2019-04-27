import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Page extends React.Component{
  render(){
    console.log(this.props.email)
    return(
      <div className="registration">
        <div className="card-auth-2 regis-h">
          <div className="reg-h-t-b-l">
            <div className="reg-h-t">Восстановление аккаунта</div>
          </div>
          <form className="res-form">
            <div className="r-i-block">
              <label>Электронная почта</label><br/>
              <input
                type="text"
                name="email"
                value={this.props.value}
                onChange={e => this.props.emailHandler(e)}
                className="r-f-input"
                placeholder="example@mail.com"
              />
            </div>
            <div className="res-i-block">
              <button className="reg-btn" onClick={this.props.sendToken}>Далее</button>
            </div>
          </form>
          <p className="r-footer-text">
            Вы вспомнили пароль на One Life? <Link to="/auth/login"> Войти</Link>
          </p>
        </div>
      </div>
    )
  }
}





export default connect(
  (state) => ({
    email: state.errors
  })
)(Page)
