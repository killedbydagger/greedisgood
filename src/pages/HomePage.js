import React from 'react';
import {Redirect} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    render() {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser === null) {
            return <Redirect to="/login"/>
        }else {
            return (
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#pricing">Logout</Nav.Link>
                    </Nav>
                </Navbar>
            );
        }
    }
}

export default HomePage