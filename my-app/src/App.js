import React, { Component } from 'react';
import logo from './logo-unamo-main.svg';
import Table from './table.js';
import Form from './form.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showLimitM: false,
      showAddedM: false,
    }
    this.showForm = this.showForm.bind(this);
    this.showLimitM = this.showLimitM.bind(this);
    this.newUser = this.newUser.bind(this);
    this.child = React.createRef();
  }

  showForm() {
    this.setState({
      showForm: true,
      showAddedM: false
    })
  }

  newUser(userData) { // get values from form and sending it to table + show message if user was added
    var newUser = userData;
    if (this.child.current.addUser(newUser)) {
      this.setState({
        showForm: false,
        showAddedM: true
      })

      const data = {
        'username': userData[0],
        'email': userData[1]
    }
    
      fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
    } else {
      this.setState({
        showForm: false
      })
    }
  }

  showLimitM(isMax) { //if there is a maximum of users show message
    if (isMax) {
      if (this.state.showLimitM === false) {
        this.setState({
          showLimitM: true
        })
      }
    } else {
      if (this.state.showLimitM === true) {
        this.setState({
          showLimitM: false
        })
      }
    }
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
                <Form newUser={this.newUser} />
                :
                <button disabled={this.state.showLimitM} onClick={this.showForm} className="btn-Add"><i className="fas fa-plus-circle fa-lg"></i>  Add user</button>
              }
              {this.state.showAddedM && this.state.showLimitM ?
                <span className={this.state.showLimitM ? 'message limit' : 'hidden'}><i className="fas fa-exclamation-circle fa-check fa-lg"></i>You can't add new user because of a limit.</span> /* I know could take the same exclamation mark as in psd, but isn't it better to have all icons in svg? + There is exact the same inon in font awsome PRO library ( not adv ) */
                :
                <span className={this.state.showAddedM ? 'message success' : 'hidden'}><i className="fas fa-check fa-lg"></i>You have successfully added an user.</span>
              }
            </div>
            <div className="container-body">
              <Table ref={this.child} showLimitM={this.showLimitM} />
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
