import React, { Component } from 'react';
import Line from './line.js';
import './table.css';

class Table extends Component {

    constructor(props) {
        super();
        this.state = {
            users: [],
            isLoaded: false,
        }
        this.deleteLine = this.deleteLine.bind(this);
    }

    addUser(name, email) {
        var userData = this.props.addUser();
        var usersArr = this.state.users;
        if (!(usersArr.length === 10)) {
            var newUser = usersArr[usersArr.length];
            newUser.username = userData[0];
            newUser.email = userData[1];

            usersArr.push(newUser);
        }
    }

    deleteLine(i) {
        var usersArr = this.state.users;
        usersArr.splice(i, 1);
        this.setState({ users: usersArr });
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    users: json,
                })

            });
    }

    render() {

        var { isLoaded, users } = this.state;


        if (!isLoaded) {
            return (
                <div className="loader" id="loader">
                    <div className="l-container">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>);
        } else {

            return (
                <table>
                    <thead>
                        <tr>
                            <th>LP</th>
                            <th>USER</th>
                            <th>E-MAIL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <Line key={index} index={index} user={user} deleteLine={this.deleteLine} />
                        ))}
                    </tbody>
                </table>

            );
        }
    }
}

export default Table;
