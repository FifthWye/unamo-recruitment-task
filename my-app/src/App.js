import React, { Component } from 'react';
import logo from './logo-unamo-main.svg';
import Table from './table.js';
import Form from './form.js'

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      showForm: false
    }
    this.addUser = this.addUser.bind(this);
    this.showF = this.showF.bind(this);
  }

  showF() {
    this.setState({ showForm: true })
  }

  addUser() {
    this.refs.form.newUserValues();
  }

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
              {this.state.showForm ?
                <Form ref="form" />
                :
                <button onClick={this.showF} className="btn-Add"><i className="fas fa-plus-circle fa-lg"></i>  Add user</button>
              }
            </div>
            <div className="container-body">
              <Table addUser={this.addUser} />
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
