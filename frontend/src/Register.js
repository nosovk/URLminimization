import React, {Component} from 'react';
import './App.css';
import {Form, Button, Alert} from "react-bootstrap";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            user: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                password2: document.getElementById('password2').value
            })
        };
        const response = await fetch('http://localhost:5000/register', requestOptions);
        const data = await response.json();
        console.log(data);
        this.setState({ message: data.error, user: data.user});

    }

    render() {

        let message;
        if (this.state.message !== '') {
            message = <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{this.state.message}</p>
            </Alert>
        }

        return this.state.user ? (
            window.location.assign('http://localhost:3000/login')
        ) : (
            <div>
                <Form>
                    <h1>Register</h1>
                    <div>{message}</div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id="email" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id="password" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" id="password2"/>
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={this.handleClick}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Register;
