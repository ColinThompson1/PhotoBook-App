import React, {Component} from 'react';
import Background from './images/back2.png';

import './App.css';
import {Navbar, Button, Alignment, Text, Card, Elevation, Spinner} from "@blueprintjs/core";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactDOM from "react-dom";
import Register from "./Register";
import axios from 'axios'
import Login from "./Login"
import Book from "./index";
import Canvas from "./components/Canvas";

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

var photobookList = {
    fontSize: '15px'
}

function LoginFunc() {
    axios.post("/user/logout");
    ReactDOM.render(<Login />, document.getElementById('root'));
}

function getBooks(){
    return axios.get("/user/test",{
        params: {
            username: localStorage.getItem('username')
        }
    }).then(function (response) {
        localStorage.setItem("books",response.data.photobooks)
        return response.data
    })
}





class CreateBook extends Component {

    constructor() {
        super()
        this.state = {
            bookname: '',
            books: '',
            isLoaded: false,
            links:[],
            names:[],
            tags:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }



    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        })
        console.log(this.state.bookname)
    }

    handleSubmit(event){
        var ourBook = this.state.bookname;
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
                    "docID" : ourBook + ";" + "http://localhost:3000/book/" +localStorage.getItem('docID')
                });
                window.location.replace("http://localhost:3000/book/" + response.data.id);

            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault();
    }

    componentWillMount() {
        getBooks().then(data =>{

            // var s = data.photobooks.toString()
            // var s1 = s.replace(/;/g, "   ")
            // console.log(s)
            // var s2 = s1.replace(/,/g, "\n")
            // console.log(s2)
            //
            // this.setState({
            //     books: s2
            // })

            for(var i = 0; i<data.photobooks.length; i++){

                var s = data.photobooks[i].toString()
                var s2 = s.split(";");

                this.setState({
                    names: this.state.names.concat(s2[0]),
                    links: this.state.links.concat(s2[1])
                })
            }
            console.log(this.state.names)
            console.log(this.state.links)

            for(var i=0; i<this.state.names.length; i++){
                var s = "<a href=\"" + this.state.links[i] + "\">" + this.state.names[i] + "</a><br>"
                this.setState({
                    tags: this.state.tags.concat(s)
                })
            }

            var s = this.state.tags.toString().replace(/,/g, "");
            this.setState({
                bookname: s
            })

            console.log(this.state.bookname)




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
                                <input type="text" className="bp3-input" placeholder="Book name..." name="bookname"  onChange={this.handleChange} required/>



                                <Button onClick={this.handleSubmit}>Create Book</Button>

                            </form>
                        </Card>


                        <br/>


                        <Card>
                            <Text>Your PhotoBooks</Text>
                            <section style={photobookList}>
                                <p style={{
                                    'whiteSpace': 'pre-wrap'
                                }}>{ReactHtmlParser(this.state.bookname)}</p>

                            </section>

                        </Card>


                    </section>
                </section>





            </div>


        );
    }
}

export default CreateBook;
