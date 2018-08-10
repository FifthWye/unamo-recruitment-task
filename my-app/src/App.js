import React, { Component } from 'react';
import logo from './logo-unamo-main.svg';
import Table from './table.js';
import Form from './form.js'

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      showForm: false,
      showLimitM : false
    }
    this.table = React.createRef();
    this.addUser = this.addUser.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  showForm() {
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
                <button onClick={this.showForm} className="btn-Add"><i className="fas fa-plus-circle fa-lg"></i>  Add user</button>
              }
              <span className={this.state.showLimitM ? 'message' : 'hidden'}><i className="fas fa-exclamation-circle fa-lg"></i>You can't add new user because of a limit.</span> {/* I know could take the same exclamation mark as in psd, but isn't it better to have all icons in svg? + There is exact the same inon in font awsome PRO library ( not adv ) */}
            </div>
            <div className="container-body">
              <Table ref={this.table} addUser={this.addUser} />
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
