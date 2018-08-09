import React, { Component } from 'react';

class Line extends Component {
    constructor(props){
        super();
        this.remove = this.remove.bind(this);
    }

    remove() {
        this.props.deleteLine(this.props.index);
    }

    render() {
        return (
        <tr >
            <td><div className="id">{this.props.user.id}</div></td>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.email}</td>
            <td><button onClick={this.remove} className="btn-Delete">&times;</button></td>
        </tr>
        );
    }

}

export default Line;