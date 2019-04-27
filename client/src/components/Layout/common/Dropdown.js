import React from 'react';
import { withRouter, Link } from 'react-router-dom'

const Dropdown = props =>

    <div className="">
      <Link onClick={props.closeDropdown} to={`${props.match.path}/profile`}><div className="dropdown-p s-r-text g-border"><img src="/images/user.svg" /> Профиль</div></Link>
      <div onClick={props.logoutUser} className="dropdown-p s-r-text"><img src="/images/exit.svg" /> Выйти</div>
    </div>

export default withRouter(Dropdown);
