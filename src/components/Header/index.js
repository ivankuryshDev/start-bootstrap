import React, { Component } from "react";
import { Link } from "react-router-dom";

import './styles.css';

class Header extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-default navbar-static-top navbar--bordered"
        role="navigation"
      >
          <h1 className="nav__heading">SB Admin v2.0</h1>
      </nav>
    );
  }
}

export default Header;
