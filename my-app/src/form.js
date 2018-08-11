import React, { Component } from 'react';
import './form.css'

function validateForm(username, email) {

    if (username.length > 2 && username.length <= 20) {
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
        showReset: false,
        // touched: {
        //     username: false,
        //     email: false,
        // }
    };

    constructor(props) {
        super();
        this.state = this.defaultState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.newUserValues = this.newUserValues.bind(this);
    }

    handleUsernameChange = (evt) => {
        this.setState({ username: evt.target.value });
        if (!(this.state.username.trim() === "")) {
            this.setState({ showReset: true })
        }
    }

    handleEmailChange = (evt) => {
        this.setState({ email: evt.target.value });
        if (!(this.state.username.trim() === "")) {
            this.setState({ showReset: true })
        }
    }

    handleSubmit = (evt) => { // sending values to parent 
        evt.preventDefault();
        this.newUserValues(this.state.username, this.state.email)
    }

    // handleBlur = (field) => (evt) => { // wanted to make inputs border become red if there is mistakes in exact input, but still want to finish earlier :)
    //     this.setState({
    //         touched: { ...this.state.touched, [field]: true },
    //     });
    // }

    resetFields = () => {
        this.setState(this.defaultState);
    }

    newUserValues(username, email) {
        var dataArr = [username, email]
        this.props.newUser(dataArr)
    }

    componentDidMount(){
        this.nameInput.focus();
    }

    render() {
        const btnDisabled = validateForm(this.state.username, this.state.email);

        return (

            <form name="add-form" id="addUserForm" onSubmit={this.handleSubmit}>

                <input type="text" className={"inputField"} name="username" autoComplete="off" ref={(input) => { this.nameInput = input; }} placeholder="Name..." onChange={this.handleUsernameChange} value={this.state.username} maxLength={20} />

                <input type="text" className={"inputField"} name="email" autoComplete="off" placeholder="E-mail..." onChange={this.handleEmailChange} value={this.state.email} />

                <button disabled={btnDisabled} type='submit' id="btn-Submit">Submit</button>

                <button onClick={this.resetFields} type='button' id={this.state.showReset ? 'btn-Reset' : 'hidden'}>Reset fields</button>
            </form>

        );
    }

}

export default Form;