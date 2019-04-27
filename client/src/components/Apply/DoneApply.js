import React from 'react';
import { Link } from 'react-router-dom';

const DoneApply = () =>

  <div className="registration">
    <div className="applydone">
      <img src="/images/congrats.png" />
      <div className="c-d-text-field">
        <span className="c-d-h-text">Поздравляем!</span>
        <p className="c-d-p-text">
          Вы зарегистрировались. Удачи!
        </p>
      </div>
      <Link to="/student"><button className="btn-app-to-h btn-g">Вернуться на главную</button></Link>
    </div>
  </div>

export default DoneApply;
