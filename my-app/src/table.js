import React, { Component } from 'react';
import styles from './table.css';

class  Table extends Component {

    constructor(props) {
        super();
        this.state = {
            users: [],
            isLoaded: false,
        }
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

        if(!isLoaded){
                return <div>Loading...</div>;
        } else{

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
                {users.map(user => (
                <tr key={user.id}>
                    <td><div className="id">{user.id}</div></td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td><button className="btn-Delete">&times;</button></td>
                </tr>
                ))}
                </tbody>
            </table>

        );
    }
    }
}

export default Table;
