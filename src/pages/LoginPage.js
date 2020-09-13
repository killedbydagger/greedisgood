import React from 'react';
import Form from '../components/Form';
import logo from '../assets/logo.png'
import FormCard from '../components/FormCard';
import * as API from '../utils/apiURL'
import {Link, Redirect} from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "", 
            password: "",
            showError: "none",
            errorMessage: "",
            loggedIn: false
        };
    
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const loggedInUser = localStorage.getItem("user");
        // console.log(loggedInUser);
        if(loggedInUser) {
            this.setState({
                loggedIn: true
            });
        }
    }

    handleChange(event, type) {
        this.setState({
            [`${type}`]: event.target.value
        });
    }
    
    handleSubmit() {
        if(this.state.username === "") {
            this.setState({
                showError: "block",
                errorMessage: "Username can not be empty"
            });
        }else if(this.state.password === "") {
            this.setState({
                showError: "block",
                errorMessage: "Password can not be empty"
            });
        }else  {
            const url = API.login_url;
            const body = {
                username: this.state.username,
                password: this.state.password
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
                        showError: "none",
                        errorMessage: "Username or Password does not match"
                    });
                }else {
                    console.log(data["data"]["user"]);
                    localStorage.setItem('user', data["data"]["user"]);
                    this.setState({
                        loggedIn: true
                    });
                }
            });
        }
    }

    render() {
        if(this.state.loggedIn === true) {
            return <Redirect to="/home"/>
        }else {
            return (
                <div style={{width: '45%', margin:'0 auto', textAlign:'center', paddingBottom: '5px'}}>
                    <img src={logo} alt="logo" style={{width: '50%'}}/>
                    <FormCard width='50%'>
                        <div style={{textAlign: 'left'}}>
                            <Form label='Username' value={this.state.username} onChange={event => this.handleChange(event, "username")} type="text"/>
                            <Form label='Password' value={this.state.password} onChange={event => this.handleChange(event, "password")} type="password"/>
                            <p className='errorText' style={{color: 'red', display: this.state.showError, textAlign: 'right'}}>{this.state.errorMessage}</p>
                            <button className='ui teal button' onClick={event => this.handleSubmit(event)} style={{width: '100%', marginTop: '10px'}}>Login</button>
                            <div style={{textAlign: 'center', marginTop: '5px'}}>
                                <div>
                                    <label>Do not have an account ? </label>
                                    <Link to="/register"
                                        style={{textDecoration: 'underline', color: 'blue', marginLeft: '3px'}}>Register</Link>
                                </div>
                                <div style={{marginTop: '5px'}}> 
                                    <Link to="/forgetpassword" 
                                        style={{color: 'aqua', marginLeft: '3px'}}>Forget Password</Link>
                                </div>
                            </div>
                        </div>
                    </FormCard>
                </div>
            );
        }
    }
}

export default LoginPage