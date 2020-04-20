import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Form, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";


class EmailTokenReset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            error: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(e){
        e.preventDefault();
        const { _id, token } = this.props
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: document.getElementById('password').value,
                password2: document.getElementById('password2').value
            })
        };
        const response = await fetch(`http://localhost:5000/password/reset/${_id}/${token}`, requestOptions);
        const data = await response.json();
        this.setState({ submitted: data.submitted, error: data.error });
    }

    render() {
        let message;
        if (this.state.error !== ''){
            message = <Alert variant="danger" >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{this.state.error}</p>
            </Alert>
        }

        return this.state.submitted ? (
            <div>
                <h1>Update your password</h1>
                <h2>{this.state.error}</h2>

                <Link to="/login" className="ghost-btn">
                    Sign back in
                </Link>

            </div>
            ) : (
            <Form>
                <h1>Update your password</h1>
                <div>{message}</div>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="password" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" id="password2"/>
                </Form.Group>

                <Button variant="primary" type="button" onClick={this.handleClick}>
                    Submit
                </Button>
            </Form>
        );
    }
}


export default EmailTokenReset;
