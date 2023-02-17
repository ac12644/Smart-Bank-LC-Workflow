import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar is-primary" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <strong>{this.props.appName}</strong>
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
    );
  }
}

export default Nav;
