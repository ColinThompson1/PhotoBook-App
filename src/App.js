import React, {Component} from 'react';
import Header from './components/Header';

import './App.css';
import Editor from "./components/Editor";
import {DragDropContextProvider} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header name={"Untitled Photobook"}/>
                <DragDropContextProvider backend={HTML5Backend}>
                    <Editor/>
                </DragDropContextProvider>
            </div>
        );
    }
}

export default App;
