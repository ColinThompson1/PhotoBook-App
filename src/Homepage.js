import React, {Component} from 'react';
import Background from './images/back.png';

import './App.css';
import {Navbar, Button, Alignment, Text} from "@blueprintjs/core";
import ReactDOM from "react-dom";
import Register from "./Register";
import Login from "./Login"


var sectionStyle = {
    height: "95vh",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${Background})`,
    fontFamily: 'PT Sans',
    color: 'white',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
    fontSize: '150px'
};

var blurb = {
    fontSize: '30px'
}

function LoginFunc() {
    ReactDOM.render(<Login />, document.getElementById('root'));
}

function RegisterFunc() {
    ReactDOM.render(<Register />, document.getElementById('root'));
}

class Homepage extends Component {

    render() {
        return (
            <div className="App">
                <Navbar className="bp3-dark">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>PhotoBook Maker</Navbar.Heading>
                    </Navbar.Group>

                    <Navbar.Group align={Alignment.RIGHT}>
                        <Button className='bp3-minimal' icon='home' text='Home'/>
                        <Button className="bp3-minimal" icon="log-in" text="Login" onClick={LoginFunc} />
                        <Button className="bp3-minimal" icon="document" text="Register" onClick={RegisterFunc}/>
                    </Navbar.Group>
                </Navbar>

                <section style={ sectionStyle }>
                    <br/>
                    <Text>PhotoBook</Text>
                    <section style={blurb}>
                        <Text>PhotoBook is a collaborative Photo Book creation tool.</Text>
                        <Text>Perfect for remembering the good times with family and friends.</Text>
                    </section>
                </section>





            </div>


        );
    }
}

export default Homepage;
