import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Form} from "react-bootstrap";
import TopLinks from "./TopLinks";
import {URL} from "./config"


class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            urlCode: ''
        };
        //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        const shortUrl = `${URL}/`+ this.state.urlCode;
        return (
            <div>
                hello
            </div>
        );
    }
}


export default Account;
