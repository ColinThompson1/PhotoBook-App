import React, { Component } from 'react';
//import {Link} from 'react-router';
import './App.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uname: null,
      email: null,
      email2: null,
      password: null,
      password2: null
    };

    this.handleChangeUname = this.handleChangeUname.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeEmail2 = this.handleChangeEmail2.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUname = (event) => {
    this.setState({uname: event.target.value});
  }

  handleChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleChangeEmail2 = (event) => {
    this.setState({email2: event.target.value});
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleChangePassword2 = (event) => {
    this.setState({password2: event.target.value});
  }


  handleSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
  }

  



  render() {
    return (
      <div className="Register">
        <header className="App-header">
        <form name="form" onSubmit={this.handleSubmit}>
          <label htmlFor="uname"><b>Username</b></label><br/>
          <input type="text" placeholder="Enter Username" name="uname" uname={this.state.uname} onChange={this.handleChangeUname} required/><br/>

          <label htmlFor="email"><b>Email</b></label><br/>
          <input type="text" placeholder="Enter Email" name="email"  email={this.state.email} onChange={this.handleChangeEmail} required/><br/>

          <label htmlFor="email2"><b>Confirm Email</b></label><br/>
          <input type="text" placeholder="Confirm Email" name="email2"  email2={this.state.email2} onChange={this.handleChangeEmail2} required/><br/>

          <label htmlFor="password"><b>Password</b></label><br/>
          <input type="password" placeholder="Enter Password" name="password" password={this.state.password} onChange={this.handleChangePassword} required/><br/>

          <label htmlFor="password2"><b>Password</b></label><br/>
          <input type="password" placeholder="Confirm Password" name="password2" password2={this.state.password2} onChange={this.handleChangePassword2} required/><br/><br/>

          <input type="submit" value="Submit"/>

          
        </form>
          


        </header>
      </div>
    );
  }
}

export default Register;
