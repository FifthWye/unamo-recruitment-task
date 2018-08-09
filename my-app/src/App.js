import React, { Component } from 'react';
import logo from './logo-unamo-main.svg';
import Table from './table.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="unamo-logo" alt="logo" />
          </a>
          <a href="https://unamo.com/">
            <span className="unamo-link">www.unamo.com</span>
          </a>
        </header>
        <div className="App-body">
          <div className="container">
            <div className="container-header">
              <button className="btn-Add"><i class="fas fa-plus-circle fa-lg"></i>  Add user</button>
            </div>
            <div className="container-body">
              <Table />
            </div>
            <div className="container-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
