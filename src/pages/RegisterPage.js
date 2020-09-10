import React from 'react';
import Form from '../components/Form';
import logo from '../assets/logo.png'
import FormCard from '../components/FormCard';
import * as API from '../utils/apiURL'
import {Link} from 'react-router-dom';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            username: "", 
            password: "",
            confirmation: "",
            showError: "none",
            errorMessage: "",
            classButton: "ui teal button"
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
        if(this.state.first_name === ""){
            this.setState({
                showError: "block",
                errorMessage: "First name can not be empty"
            });
        }else if(this.state.last_name === "") {
            this.setState({
                showError: "block",
                errorMessage: "Last name can not be empty"
            });
        }else if(this.state.email === "") {
            this.setState({
                showError: "block",
                errorMessage: "Email can not be empty"
            });
        }else if(this.state.username === "") {
            this.setState({
                showError: "block",
                errorMessage: "Username can not be empty"
            });
        }else if(this.state.password === "") {
            this.setState({
                showError: "block",
                errorMessage: "Password can not be empty"
            });
        }else if(this.state.confirmation === "") {
            this.setState({
                showError: "block",
                errorMessage: "Confirmation Password can not be empty"
            });
        }else if(this.state.password !== this.state.confirmation){
            this.setState({
                showError: "block",
                errorMessage: "Password and Confirmation Password not match"
            });
        }else {
            this.setState({
                classButton: this.state.classButton + " loading"
            });

            const url = API.register_url;
            const body = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
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
                if(data["status"] !== "Success") {
                    this.setState({
                        showError: "none",
                        errorMessage: data["status"],
                        classButton: "ui teal button"
                    });
                    alert(this.state.errorMessage);
                }else {
                    this.setState({
                        showError: "none",
                        errorMessage: "",
                        classButton: "ui teal button"
                    });
                    alert("Success create an account");
                }
            });
        }
    }

    render() {
        return (
            <div style={{width: '35%', margin:'0 auto', textAlign:'center', paddingBottom: '5px'}}>
                <img src={logo} alt="logo" style={{width: '50%'}}/>
                <FormCard width='60%'>
                    <div style={{textAlign: 'left'}}>
                        <Form label='First Name' value={this.state.first_name} onChange={event => this.handleChange(event, "first_name")}/>
                        <Form label='Last Name' value={this.state.last_name} onChange={event => this.handleChange(event, "last_name")}/>
                        <Form label='Email' value={this.state.email} onChange={event => this.handleChange(event, "email")}/>
                        <Form label='Username' value={this.state.username} onChange={event => this.handleChange(event, "username")}/>
                        <Form label='Password' value={this.state.password} onChange={event => this.handleChange(event, "password")}/>
                        <Form label='Confirm Password' value={this.state.confirmation} onChange={event => this.handleChange(event, "confirmation")}/>
                        <p className='errorText' style={{color: 'red', display: this.state.showError, textAlign: 'right'}}>{this.state.errorMessage}</p>
                        <button className={this.state.classButton} onClick={event => this.handleSubmit(event)} style={{width: '100%', marginTop: '10px'}}>Register</button>
                        <div style={{textAlign: 'center', marginTop: '5px'}}>
                            <label>Already have an account ? </label>
                            <Link to="/login"
                                style={{fontStyle: 'underlined', color: 'blue', marginLeft: '3px'}}>Sign In</Link>
                        </div>
                    </div>
                </FormCard>
            </div>
        );
    }
}

export default RegisterPage