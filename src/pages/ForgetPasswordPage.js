import React from 'react';
import Form from '../components/Form';
import logo from '../assets/logo.png';
import FormCard from '../components/FormCard';
import * as API from '../utils/apiURL'
import {Link} from 'react-router-dom';

class ForgetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            showError: "none",
            errorMessage: "",
        };
    
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, type) {
        this.setState({
            [`${type}`]: event.target.value
        });
    }
    
    handleSubmit() {
        if(this.state.email === "") {
            this.setState({
                showError: "block",
                errorMessage: "Email can not be empty"
            });
        }else if(this.state.username === "") {
            this.setState({
                showError: "block",
                errorMessage: "Username can not be empty"
            });
        }else  {
            const url = API.forget_password;
            console.log(url);
            const body = {
                email: this.state.email,
                username: this.state.username
            };

            const headers = {
                "Content-type":"application/json; charset=UTF-8"
            };

            const jsonRequest = {
                method: "POST",
                body: JSON.stringify(body),
                json: true,
                headers
            };

            fetch(url,jsonRequest).then(response => response.json()).then(data => {
                if(data["status"] === "Failed") {
                    this.setState({
                        showError: "block",
                        errorMessage: "Email and Username does not match"
                    });
                }else {
                    this.setState({
                        showError: "none",
                        errorMessage: ""
                    });
                    console.log(data["status"]);
                }
            });
        }
    }

    render() {
        return (
            <div style={{width: '35%', margin:'0 auto', textAlign:'center', paddingBottom: '5px'}}>
                <img src={logo} alt="logo" style={{width: '50%'}}/>
                <FormCard width='50%'>
                    <div style={{textAlign: 'left'}}>
                        <Form label='Email' value={this.state.email} onChange={event => this.handleChange(event, "email")}/>
                        <Form label='Username' value={this.state.username} onChange={event => this.handleChange(event, "username")}/>
                        <p className='errorText' style={{color: 'red', display: this.state.showError, textAlign: 'right'}}>{this.state.errorMessage}</p>
                        <button className='ui teal button' onClick={event => this.handleSubmit(event)} style={{width: '100%', marginTop: '10px'}}>Forget Password</button>
                        <div style={{textAlign: 'center', marginTop: '5px'}}>
                            <Link to="/login" 
                                style={{color: 'blue', marginLeft: '3px'}}>Back to Sign In</Link>
                        </div>
                    </div>
                </FormCard>
            </div>
        );
    }
}

export default ForgetPasswordPage