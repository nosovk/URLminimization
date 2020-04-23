import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Form, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as queryString from 'query-string';

import axios from 'axios'

class Facebook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: ''
        };
        //this.handleClick = this.handleClick.bind(this);
    }


     stringifiedParams = queryString.stringify({
        client_id: '230255814883722',
        redirect_uri: 'http://localhost:3000/authenticate/facebook/',
        scope: ['email', 'user_friends'].join(','), // comma seperated string
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
    });

    facebookLoginUrl = `https://www.facebook.com/v6.0/dialog/oauth?${this.stringifiedParams}`;


    async componentDidMount() {
        const urlParams = queryString.parse(window.location.search);

        if (urlParams.code) {
            console.log(`The code is: ${urlParams.code}`);
            const access_token = await this.getAccessTokenFromCode(urlParams.code);
            const data = await this.getFacebookUserData(access_token);
            await this.setState({isSignedIn: data.email});
        }
    }

    async getAccessTokenFromCode(code) {
        const { data } = await axios({
            url: 'https://graph.facebook.com/v6.0/oauth/access_token',
            method: 'get',
            params: {
                client_id: '230255814883722',
                client_secret: '9dcf59b61c7cf59e4282fe0eefe2f93f',
                redirect_uri: 'http://localhost:3000/authenticate/facebook/',
                code,
            },
        });
        console.log(data); // { access_token, token_type, expires_in }
        return data.access_token;
    };

    async getFacebookUserData(access_token) {
        const { data } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
                fields: ['id', 'email', 'first_name', 'last_name'].join(','),
                access_token: access_token,
            },
        });
        console.log(data); // { id, email, first_name, last_name }
        return data;
    };

    render() {
        return (
           <div>
               <h1>{this.state.isSignedIn}</h1>
               <a href={this.facebookLoginUrl}>
                   Login with Facebook
               </a>
           </div>


        );
    }
}



export default Facebook;

