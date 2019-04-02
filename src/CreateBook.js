import React, {Component} from 'react';
import Background from './images/back2.png';

import './App.css';
import {Navbar, Button, Alignment, Text, Card, Elevation} from "@blueprintjs/core";
import ReactDOM from "react-dom";
import Register from "./Register";
import axios from 'axios'
import Login from "./Login"
import Book from "./index";



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



class CreateBook extends Component {

    handleSubmit(event){
        axios.post('https://localhost:3002/create', {
            "doc": {
                "canvas": {}
            }
        })
            .then(function (response) {
                console.log(response.data.id);
                localStorage.setItem('docID', response.data.id);
                axios.post("/user/pb", {
                    "username": localStorage.getItem('username'),
                    "docID" : localStorage.getItem('docID')
                });
                window.location.replace("http://localhost:3000/book/" + response.data.id);

            })
            .catch(function (error) {
                console.log(error);
            });










        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
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
                        <Button className='bp3-minimal' icon='home' text='Home'/>
                        <Button className="bp3-minimal" icon="log-out" text="Logout" onClick={LoginFunc} />
                    </Navbar.Group>
                </Navbar>

                <section style={ sectionStyle }>
                    <br/>
                    <section style={cardStyle}>

                        <Card interactive={true} elevation={Elevation.FOUR}>
                            <form name="form" /*onSubmit={this.handleSubmit}*/>

                                <Text>Enter a name for your book...</Text>
                                <input type="text" className="bp3-input .bp3-round" placeholder="Book name..." name="bookname" required/>



                                <Button onClick={this.handleSubmit}>Create Book</Button>

                            </form>
                        </Card>


                        <br/>

                        <Card>
                            <Text>Your PhotoBooks</Text>

                        </Card>

                    </section>
                </section>





            </div>


        );
    }
}

export default CreateBook;
