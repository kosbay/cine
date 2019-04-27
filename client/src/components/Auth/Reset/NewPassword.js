import React from 'react'

import {resetPassword} from '../../../actions/authActions'


class NewPassword extends React.Component {
  constructor(props) {
    super(props)
    this.password = React.createRef()
    this.password2 = React.createRef()
  }

  sendPassword = (e) => {
    e.preventDefault()
    console.log(resetPassword)

    resetPassword({
      token: this.props.match.params.token,
      password: this.password.current.value,
      password2: this.password2.current.value
    }, this.props.history)()

  }


  render() {

    return (
      <div className="registration">
        <div className="card-auth-2 regis-h">
          <div className="reg-h-t-b-l">
            <div className="reg-h-t">Восстановление пароля</div>
          </div>
          <form className="res-form">
            <div className="r-i-block">

              <input
                type="password"
                className="r-f-input"
                placeholder="Введите пароль"
                style={{marginBottom: 15}}
                ref={this.password}
              />

              <input
                type="password"
                className="r-f-input"
                placeholder="Повторите пароль"
                ref={this.password2}
              />


            </div>
            <div className="res-i-block">
              <button className="reg-btn" onClick={this.sendPassword}>Изменить</button>
            </div>
          </form>

        </div>
      </div>
    )
  }
}


export default NewPassword
