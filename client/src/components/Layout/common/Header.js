import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";

import Dropdown from "./Dropdown";
import { logoutUser } from "../../../actions/authActions";
import { clearCurrentProfile } from "../../../actions/profileActions";
import { fileserver } from "../../../constants";

class Header extends Component {
  state = {
    text: "",
    dropdown: false
  };

  componentWillMount() {
    Modal.setAppElement("body");
  }

  componentDidMount() {
    switch (this.props.title) {
      case "/student/":
        return this.setState({ text: "Главная" });
      case "/student/universities":
        return this.setState({ text: "Университеты" });
      case "/student/help":
        return this.setState({ text: "Помощь" });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === "/student/") {
      this.setState({
        text: "Главная"
      });
    }
    if (nextProps.location.pathname === "/student/universities") {
      this.setState({
        text: "Университеты"
      });
    }
    if (nextProps.location.pathname === "/student/help") {
      this.setState({
        text: "Помощь"
      });
    }
  }

  showDropdown = () => {
    this.setState({
      dropdown: true
    });
  };

  closeDropdown = () => {
    this.setState({
      dropdown: false
    });
  };

  logoutUser = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (this.state.text === "") {
      return <div />;
    }
    return (
      <header className="header">
        <div className="header-left-part">
          <span className="text-18">{this.state.text}</span>
          <div className="header-info">
            {this.props.auth.user.role === "student" ? (
              <button className="btn-app">
                <Link to="/student/apply/Выберите ВУЗ/0/Выберите факультет/0/Выберите специальность/0">
                  Подать заявку
                </Link>
              </button>
            ) : null}
            <div className="avatar">
              <img
                src={`http://${fileserver}:9999/${this.props.auth.user.avatar}`}
              />
            </div>
            <img
              onClick={this.showDropdown}
              className="dropdown"
              src="/images/dropdown.svg"
            />
          </div>
        </div>
        <Modal
          isOpen={this.state.dropdown}
          onRequestClose={this.closeDropdown}
          contentLabel="Example Modal"
          contentLabel="Example Modal"
          className="dropdown-menu"
          overlayClassName="overlay-err"
        >
          <Dropdown
            closeDropdown={this.closeDropdown}
            logoutUser={this.logoutUser}
          />
        </Modal>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(Header));
