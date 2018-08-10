import React, { Component } from 'react';
import './form.css'

function validateForm(username, email) {

    if (username.length > 2) {
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (atpos > 1 && dotpos > atpos + 2 && dotpos + 2 <= email.length) {
            return false;
        }
    }
    return true;
}

class Form extends Component {

    defaultState = {
        username: '',
        email: '',
        showReset : false,
        // touched: {
        //     username: false,
        //     email: false,
        // }
    };

    constructor(props) {
        super();
        this.state = this.defaultState;
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange = (evt) => {
        this.setState({ username: evt.target.value });
        if(!(this.state.username.trim() == "")){
            this.setState({showReset: true})
        }

    }

    handleEmailChange = (evt) => {
        this.setState({ email: evt.target.value });
        if(!(this.state.username.trim() == "")){
            this.setState({showReset: true})
        }
    }

    // handleSubmit(event) {
    //     event.preventDefault();
        

    // }

    // handleBlur = (field) => (evt) => {
    //     this.setState({
    //         touched: { ...this.state.touched, [field]: true },
    //     });
    // }

    resetFields = () => {
        this.setState(this.defaultState);
    }

    newUserValues(){
        var {username, email} = this.state;
        return [username, email];
    }

    render() {
        const btnDisabled = validateForm(this.state.username, this.state.email);

        return (

            <form name="add-form" id="addUserForm" method="POST" action="" >

                <input type="text" className={"inputField"} name="username" autoComplete="off" placeholder="Name..." onChange={this.handleUsernameChange} value={this.state.username} maxLength={20} />

                <input type="text" className={"inputField"} name="email" autoComplete="off" placeholder="E-mail..." onChange={this.handleEmailChange} value={this.state.email} />

                <button disabled={btnDisabled} type='button' id="btn-Submit">Submit</button>

                <button onClick={this.resetFields} type='button' id={this.state.showReset ? 'btn-Reset' : 'hidden'}>Reset fields</button>
            </form>

        );
    }

}

export default Form;