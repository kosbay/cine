import React from "react";
import { Link, withRouter, NavLink } from "react-router-dom";

import accordion from "../../../hoc/accordion";

const SideNav = props => (
  <div className="side-nav">
    <div className="logo">
      <img className="logo-img" src="/images/all_logo.png" />
    </div>
    <div className="nav">
      <ul className="nav-menu">
        {props.navigation.map(nav => (
          <li onClick={props.clickBtnItem(nav._id)}>
            <NavLink
              exact
              to={`${nav.link}`}
              key={nav._id}
              activeClassName="selected"
            >
              <div
                className={
                  location.pathname === nav.link ? "nav-border" : "hide"
                }
              />
              {location.pathname === nav.link ? (
                <img className="nav-icon" src={`/images/${nav.s_icon}`} />
              ) : (
                <img className="nav-icon" src={`/images/${nav.icon}`} />
              )}
              {nav.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default accordion(SideNav);
