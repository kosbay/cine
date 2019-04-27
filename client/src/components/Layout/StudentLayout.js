import React from "react";

import Header from "./common/Header";
import SideNav from "./common/Sidenav";

const navigation = [
  {
    _id: 1,
    name: "Главная",
    icon: "home-icon.svg",
    s_icon: "home-selected.svg",
    link: "/student/"
  },
  {
    _id: 2,
    name: "Университеты",
    icon: "university-building.svg",
    s_icon: "university-selected.svg",
    link: "/student/universities"
  },
  {
    _id: 3,
    name: "Помощь",
    icon: "support-icon.svg",
    s_icon: "support-selected.svg",
    link: "/student/help"
  }
];

const StudentLayout = props => (
  <div className="layout">
    <SideNav navigation={navigation} />
    <div className="ch-h">
      <Header title={location.pathname} />
      {props.children}
    </div>
  </div>
);

export default StudentLayout;
