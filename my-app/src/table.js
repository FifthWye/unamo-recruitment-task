import React, { Component } from 'react';
import Line from './line.js';
import './table.css';

function emailCheck(arr, val) { //looking for email dublicates
    var dublicates = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].email === val) {
            dublicates++;
        }
    }
    return dublicates;
}



class Table extends Component {

    constructor(props) {
        super();
        this.state = {
            users: [],
            isLoaded: false,
            noUsers: false,
            sort: {
                column: null,
                direction: 'desc',
            },
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.ifMax = this.ifMax.bind(this);
        this.onSort = this.onSort.bind(this)
    }

    addUser(user) {
        var userData = user;
        if (userData[0] && userData[1]) { //checcking if username and email are not empty
            var usersArr = this.state.users;
            if (usersArr.length) { //if array is empty don't need to check email dublicates
                if (!(emailCheck(usersArr, userData[1]))) { //looking for dublicates of new email
                    const newUser = {
                        id: (usersArr.length + 1),
                        username: userData[0],
                        email: userData[1]
                    };
                    usersArr.push(newUser);
                    this.setState({ users: usersArr });
                    return true;
                } else {
                    return false;
                }
            } else { //if array is empty don't need to check email dublicates
                const newUser = {
                    id: (usersArr.length + 1),
                    username: userData[0],
                    email: userData[1]
                };
                usersArr.push(newUser);
                this.setState({ users: usersArr });
                return true;
            }
        }
    }

    deleteUser(i) {
        var usersArr = this.state.users;
        usersArr.splice(i, 1);
        this.setState({ users: usersArr });
        if (!(usersArr.length > 0)) { // turn on the placeholder if there is no users
            this.setState({ noUsers: true })
        }
    }

    ifMax() {
        if (this.state.users.length > 9) {
            this.props.showLimitM(true);
        } else {
            this.props.showLimitM(false);
        }
    }

    onSort = (column) => (e) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'asc'; //checking direction of sorting
        const sortedData = this.state.users.sort((a, b) => {
            if (column === 'username') { // sort by username
                const nameA = a.username.toUpperCase(); // ignore upper and lowercase
                const nameB = b.username.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0; //if usernames are equal
            } else { // sort by email
                const emailA = a.email.toUpperCase(); // ignore upper and lowercase
                const emailB = b.email.toUpperCase(); // ignore upper and lowercase
                if (emailA < emailB) {
                    return -1;
                }
                if (emailA > emailB) {
                    return 1;
                }
                return 0; //if emails are equal
            }
        });

        if (direction === 'desc') {
            sortedData.reverse();
        }

        this.setState({
            users: sortedData,
            sort: {
                column,
                direction,
            }
        });
    };


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

    componentDidUpdate() {
        this.ifMax(this.state.users);
    }

    render() {

        var { isLoaded, noUsers, users } = this.state;

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
            if (noUsers) {
                return (
                    <div className="placeHolder">
                        <p>Sorry, no users yet :(</p>
                    </div>
                )
            } else {
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>LP</th>
                                <th onClick={this.onSort('username')} >USER</th>
                                <th onClick={this.onSort('email')} >E-MAIL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <Line key={index} index={index} user={user} deleteUser={this.deleteUser} />
                            ))}
                        </tbody>
                    </table>

                );
            }
        }
    }
}

export default Table;
