
import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Form} from "react-bootstrap";
import TopLinks from "./TopLinks";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shortUrl: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }


    async handleClick(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ OriginalName: document.getElementById('basic-url').value })
        };
        const response = await fetch('http://localhost:5000/api/url/shorten', requestOptions);
        const data = await response.json();
        console.log(data);
        this.setState({ shortUrl: data.shortUrl });

    }

    render() {
        return (
            <div>
                <Form>
                    <label htmlFor="basic-url">Your vanity URL</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                https://example.com/users/
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <Button variant="primary" type="button" className="pull-right" onClick={this.handleClick} >
                        Submit
                    </Button>
                </Form>
                <a href={this.state.shortUrl}>{this.state.shortUrl}</a>
                <TopLinks/>
            </div>
        );
    }
}


export default Home;



