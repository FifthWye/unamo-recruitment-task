import React, { Component } from 'react';
import logo from './logo-unamo-main.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"> 
          <img src={logo} className="unamo-logo" alt="logo" />
          <span className="unamo-link">www.unamo.com</span>
        </header>
        <div className="App-body">
          <div className="container">
            <div className="container-header">
              <button className="btn-Add"><i class="fas fa-plus-circle fa-lg"></i>  Add user</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
