import React, { Component } from "react";
import { Link } from "react-router-dom";

import './styles.css';

class Side extends Component {
  render() {
    return (
      <div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
          <ul className="nav" id="side-menu">
            <li className="menu__item">
              <Link className="item" to={"/categories"}>Categories</Link>
            </li> 
            <li className="menu__item">
              <Link className="item" to={"/news"}>News</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Side;
