import React, {Component} from 'react';
import Header from './components/Header';

import './App.css';
import Editor from "./components/Editor";
import {DragDropContextProvider} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from "./Homepage";



    function App() {
        return (
            <Router>
                <div className="App">
                    <Header name={"Untitled Photobook"}/>
                    <DragDropContextProvider backend={HTML5Backend}>
                        <Route path="/book" component={Book} />
                        <Route exact path="/" component={Home}/>
                    </DragDropContextProvider>
                </div>

            </Router>
        );
    }

    function Book({match}) {
        return (
            <Route path={`${match.path}/:id`} component={BookId} />
        )
    }

    function BookId({match}) {
        return(
            <Editor id={match.params.id}/>
        );
    }

    function Home() {
        return (
            <Homepage/>
        )
    }

export default App;
