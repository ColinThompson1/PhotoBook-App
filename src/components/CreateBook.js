import React, {Component} from 'react';
import Background from '../images/back2.png';

import '../App.css';
import {Navbar, Button, Alignment, Text, Card, Elevation} from "@blueprintjs/core";
import axios from 'axios'
import Header from "./Header";

var book = [];



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

//generates a new book
class CreateBook extends Component {

    constructor() {
        super()
        this.state = {
            uuid: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.goToBook = this.goToBook.bind(this);

    }
//creates a blank panel and canvas to work on 
    handleSubmit(event){
        axios.post("https://" +process.env.REACT_APP_DATASERVICE + "/create", {
            "doc": {
                "canvas": {},
                "panel": {}
            }
        })
            .then( (response) => {
                console.log(response.data.id);
                this.setState({uuid:response.data.id});

            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault()
    }
//sends the user to the book 
    goToBook(){
        if (this.state.uuid != "")
            window.location.replace(window.location.origin + "/book/" + this.state.uuid);
    }

//shows our home page and allows user to generate a new book then given a reference
    render() {


        return (
            <div className="App">
                <Header/>
                <section style={ sectionStyle }>
                    <br/>
                    <section style={cardStyle}>

                        <Card interactive={false} elevation={Elevation.FOUR}>
                            <form name="form" /*onSubmit={this.handleSubmit}*/>

                                <h4>Click below to generate your book</h4>

                                <Button large={true} onClick={this.handleSubmit}>Create</Button>

                            </form>
                        </Card>

                        <Card style={{marginTop:50+"px"}} interactive={false} elevation={Elevation.FOUR}>
                            <form name="form" /*onSubmit={this.handleSubmit}*/>

                                <text>Here is the UUID for your book</text>
                                <br/>
                                <br/>
                                <text>Please save this somewhere safe to access your book again</text>
                                <br/>
                                <br/>
                                <h4>{this.state.uuid}</h4>
                                <br/>
                                <Button large={true} onClick={this.goToBook}>Proceed to book</Button>

                            </form>
                        </Card>

                    </section>
                </section>
            </div>
        );
    }
}

export default CreateBook;
