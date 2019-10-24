import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// import "./bower_components/bootstrap/dist/css/bootstrap.min.css";
import "./bower_components/metisMenu/dist/metisMenu.min.css";
import "./bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css";
import "./dist/css/sb-admin-2.css";
import "./bower_components/font-awesome/css/font-awesome.min.css";

import 'bootstrap/dist/css/bootstrap.css';

import Header from "./components/Header/";
import Side from "./components/Side/";
import News from "./components/News/";
import Categories from "./components/Categories/";
import OneNews from "./components/OneNews/";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="wrapper">
          <Header />
          <Side />

          <Switch>
            <Redirect exact from="/" to="news" />
            <Route exact path="/news">
              <News />
            </Route>
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/onenews" component={OneNews} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
