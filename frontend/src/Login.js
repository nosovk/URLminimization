import React, {Component} from 'react';
import './App.css';
import {Form, Button, Alert} from 'react-bootstrap'
import {Link} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            user: false,
            accessToken: '',
            refreshToken: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: document.getElementById('em').value,
                password: document.getElementById('passw').value
            })
        };
        const response = await fetch('http://localhost:5000/login', requestOptions);
        const data = await response.json();

        saveToken({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        });


        this.setState({
            message: data.error,
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        });
    }

    render() {
        let message;
        if (this.state.message !== ''){
            message = <Alert variant="danger" >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{this.state.message}</p>
            </Alert>
        }

        return this.state.user ? (
            window.location.assign('http://localhost:3000/')
        ) : (
            <Form>
                <h1>Login</h1>
                <div>{message}</div>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="em" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="passw"/>
                </Form.Group>

                <div>
                    <Link to="/resetPsw" className="ghost-btn">
                        Forgot your password?
                    </Link>
                </div>
                <Button variant="primary" type="button" onClick={this.handleClick}>
                    Submit
                </Button>
            </Form>
        );
    }
}

function saveToken(token) {
    sessionStorage.setItem('tokenData', JSON.stringify(token));
}



export default Login;
