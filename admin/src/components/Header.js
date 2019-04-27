import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";

import { logout as logoutAction } from '../actions/auth';

const menuItems = [
  { link: "/schools", name: "Schools", icon: "shop" },
  { link: "/users", name: "Users", icon: "user" },
  { link: "/faculties", name: "Faculties", icon: "table" },
  { link: "/courses", name: "Courses", icon: "database" },
  { link: "/chapters", name: "Chapters", icon: "profile" },
  { link: "/modules", name: "Modules", icon: "file" },
  { link: "/skills", name: "Skills", icon: "tool" },
  { link: "/notifications", name: "Notifications", icon: "notification" },
  { link: "/contests", name: "Contests", icon: "trophy" },
  { link: "/certificates", name: "Certificates", icon: "file-markdown" },
  { link: "/events", name: "Events", icon: "hourglass" },
  { link: "/tariffs", name: "Tariffs", icon: "dollar" }
];

class Header extends Component {
  state = {
    current: ""
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  renderContent() {
    if (this.props.auth) {
      return (
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          theme="dark"
        >
          {this.props.auth.role === "admin" &&
            menuItems.map(item => (
              <Menu.Item key={item.name}>
                <Link to={item.link} key={item.link}>
                  <Icon type={item.icon} /> {item.name}
                </Link>
              </Menu.Item>
            ))}

          {this.props.auth.role === "reviewer" && (
            <Menu.Item key="submissions">
              <Link to="/submissions" key="submissions">
                <Icon type="file" /> Submissions
              </Link>
            </Menu.Item>
          )}

          <Menu.Item
            key="logout"
          >
            <a href="/" onClick={this.props.logout}>
              <Icon type="logout" /> Log Out
            </a>
          </Menu.Item>
        </Menu>
      );
    }
    return (
      <a href="/login">
        <Icon type="login" /> Login
      </a>
    );
  }

  render() {
    return (
      <Layout.Header style={{ height: 46 }}>
        {this.renderContent()}
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.shape({
    role: PropTypes.string
  }),
  logout: PropTypes.func.isRequired
};

Header.defaultProps = {
  auth: {}
};

function mapStateToProps({ auth }) {
  return { auth };
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => logoutAction(dispatch)
  });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
