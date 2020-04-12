import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            user: false
        };
    }

     componentDidMount() {
        sessionStorage.tokenData && this.setState({user: true})
    }

    logout(){
        sessionStorage.clear();
    }

    render() {
        let links;
        if (this.state.user){
            links= <Nav className="ml-auto">
                <Nav.Link href="/login" onClick={this.logout}>LogOut</Nav.Link>
            </Nav>
        } else {
            links = <Nav className="ml-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        }
        return (
            <div>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand href="/">Url-Minimization</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {links}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
