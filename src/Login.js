import React, {Component} from 'react';
import Background from './images/back.png';
import axios from 'axios';

import './App.css';
import {Navbar, Button, Alignment, Text, Card, Elevation, Toaster, Position, Intent} from "@blueprintjs/core";
import ReactDOM from "react-dom";
import Register from "./Register";
import Homepage from './Homepage';
import CreateBook from "./CreateBook";

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



function RegisterFunc() {
    ReactDOM.render(<Register />, document.getElementById('root'));
}

function HomeFunc() {
    ReactDOM.render(<Homepage />, document.getElementById('root'));
}






class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
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
        console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {

                    var t = Toaster.create({
                        className: "recipe-toaster",
                        position: Position.BOTTOM,
                    }).show({message:"Logged in!", intent:Intent.SUCCESS});

                    // update App.js state


                    ReactDOM.render(<CreateBook />, document.getElementById('root'));

                    // update the state to redirect to home
                    // this.setState({
                    //     redirectTo: '/'
                    // })


                }
            }).catch(error => {

            var t = Toaster.create({
                className: "recipe-toaster",
                position: Position.BOTTOM,
            }).show({message:"Wrong username/password.", intent:Intent.DANGER});

            console.log('login error: ')
            console.log(error);

        })
        event.preventDefault();
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
                        <Button className="bp3-minimal" icon="log-in" text="Login" />
                        <Button className="bp3-minimal" icon="document" text="Register" onClick={RegisterFunc}/>
                    </Navbar.Group>
                </Navbar>

                <section style={ sectionStyle }>
                    <br/>

                    <section style={cardStyle}>

                        <Card interactive={true} elevation={Elevation.FOUR}>
                            <form name="form" /*onSubmit={this.handleSubmit}*/>

                                <Text>Username</Text>
                                <input type="text" className="bp3-input .bp3-round" placeholder="Enter Username" name="username" uname={this.state.username} onChange={this.handleChange} required/><br/>

                                <Text>Password</Text>
                                <input type="password" className="bp3-input .bp3-round" placeholder="Enter Password" name="password" password={this.state.password} onChange={this.handleChange} required/><br/>

                                <Button onClick={this.handleSubmit}>Login</Button>

                            </form>
                        </Card>

                    </section>

                </section>





            </div>


        );
    }
}

export default Login;
