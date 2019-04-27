import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class NextPage extends React.Component{
  render() {

    return (
      <div className="registration">
        <div className="card-auth-2 regis-h">
          <div className="reg-h-t-b-l">
            <div className="reg-h-t">Восстановление аккаунта</div>
          </div>
          <div className="res-form">
            <img src="/images/mail.png" />
            <p className="res-f-text">
              Получите код подтверждения
              Мы отправим код подтверждения на адрес {this.props.email}
            </p>
            <div className="res-i-block">
              <Link to="/auth/login"><button className="reg-btn">Войти</button></Link>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default connect(
  (state) => ({
    email: state.newPasswordEmail
  })
)(NextPage)
