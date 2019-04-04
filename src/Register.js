import React, {Component} from 'react';
import Background from './images/back.png';

import axios from 'axios';
import './App.css';
import {Navbar, Button, Alignment, Text, Card, Elevation, Toaster, Position, Intent} from "@blueprintjs/core";
import ReactDOM from "react-dom";
import Login from "./Login";
import Homepage from './components/Homepage';

var sectionStyle = {
    height: "95vh",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${Background})`,
    fontFamily: 'PT Sans',
    color: '@dark-gray1',
    fontSize: '30px'
};

var cardStyle = {
    width: '50vw',
    margin: 'auto'
}

function LoginFunc() {
    ReactDOM.render(<Login />, document.getElementById('root'));
}

function HomeFunc() {
    ReactDOM.render(<Homepage />, document.getElementById('root'));
}




class Register extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        console.log('sign-up handleSubmit, username: ')
        console.log(this.state.username)
        event.preventDefault()

        //request to server to add a new username/password
        axios.post('/user/', {
            username: this.state.username,
            password: this.state.password,
            photobooks: []
        })
            .then(response => {
                console.log(response)
                if (!response.data.errmsg) {
                    console.log('successful signup')

                    var t = Toaster.create({
                        className: "recipe-toaster",
                        position: Position.BOTTOM,
                    }).show({message:"Successful signup!", intent:Intent.SUCCESS});

                    ReactDOM.render(<Login />, document.getElementById('root'));
                } else {
                    console.log('username already taken')
                    var t = Toaster.create({
                        className: "recipe-toaster",
                        position: Position.BOTTOM,
                    }).show({message:"Username taken!", intent:Intent.DANGER});
                }
            }).catch(error => {
            console.log('signup error: ')
            console.log(error)
            var t = Toaster.create({
                className: "recipe-toaster",
                position: Position.BOTTOM,
            }).show({message:"Registration failed!", intent:Intent.DANGER});

        })
    }

    render() {
        return (
            <div className="App">
                <Navbar className="bp3-dark">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>PhotoBook Maker</Navbar.Heading>
                    </Navbar.Group>

                    <Navbar.Group align={Alignment.RIGHT}>
                        <Button className='bp3-minimal' icon='home' text='Home' onClick={HomeFunc}/>
                        <Button className="bp3-minimal" icon="log-in" text="Login" onClick={LoginFunc} />
                        <Button className="bp3-minimal" icon="document" text="Register"/>
                    </Navbar.Group>
                </Navbar>

                <section style={ sectionStyle }>
                    <br/>

                    <section style={cardStyle}>

                        <Card interactive={true} elevation={Elevation.FOUR}>
                            <form name="form" /*onSubmit={this.handleSubmit}*/>

                                <Text>Username</Text>
                                <input type="text" className='bp3-input' placeholder="Enter Username" name="username" username={this.state.username} onChange={this.handleChange} required/><br/>

                                <Text>Password</Text>
                                <input type="password" className='bp3-input' placeholder="Enter Password" name="password" password={this.state.password} onChange={this.handleChange} required/><br/>

                                <Text>Confirm Password</Text>
                                <input type="password" className='bp3-input' placeholder="Confirm Password" name="confirmPassword" password2={this.state.confirmPassword} onChange={this.handleChange} required/><br/>

                                <Button onClick={this.handleSubmit}>Register</Button>


                            </form>
                        </Card>

                    </section>

                </section>





            </div>


        );
    }
}

export default Register;
