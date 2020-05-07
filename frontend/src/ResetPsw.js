import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {URL} from "./config";


class ResetPsw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pushedButton: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(e){
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: document.getElementById('email').value })
        };
        const response = await fetch(`${URL}/resetPassword`, requestOptions);
        const data = await response.json();
        this.setState({ pushedButton: data});
    }

    render() {
        return this.state.pushedButton ? (
            <div className="reset-password-form-sent-wrapper">
                <p>
                    If that account is in our system, we emailed you a link to reset
                    your password.
                </p>
                <Link to="/login" className="ghost-btn">
                    Return to sign in
                </Link>
            </div>
        ) : (
            <div>
                <Form>
                    <h1>Reset Password</h1>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id="email" />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.handleClick}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}


export default ResetPsw;
