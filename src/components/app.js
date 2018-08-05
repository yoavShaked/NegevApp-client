import React, { Component } from 'react';
import MainNavBar from './MainNavBar';
import HistoryPage from './HistoryPage';
import routes from '../routers';

export default class App extends Component {
  render() {

    return (
      <div className="app">
        <div>
          <MainNavBar />
        </div>
        <div className="page">
          {this.props.children}
        </div>
      </div>

    );
  }
}
