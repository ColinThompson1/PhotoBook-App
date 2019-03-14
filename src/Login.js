import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Register from './Register';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          uname: null,
          password: null
        };
    
        this.handleChangeUname = this.handleChangeUname.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUname = (event) => {
        this.setState({uname: event.target.value});
    }

    handleChangePassword = (event) => {
        this.setState({password: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
     }


  render() {
    return (
      <div className="Login">
        <header className="App-header">
            <form name="form" onSubmit={this.handleSubmit}>
                <label htmlFor="uname"><b>Username</b></label><br/>
                <input type="text" placeholder="Enter Username" name="uname" uname={this.state.uname} onChange={this.handleChangeUname} required/><br/>

                <label htmlFor="psw"><b>Password</b></label><br/>
                <input type="password" placeholder="Enter Password" name="psw" password={this.state.password} onChange={this.handleChangePassword} required/><br/><br/>

                <button type="submit">Login</button>

            </form>
          
        </header>
      </div>
    );
  }
}

export default Login;
