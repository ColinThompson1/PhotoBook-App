import React, {Component} from 'react';
import Header from './components/Header';

import './App.css';
import Editor from "./components/Editor";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header></Header>
                <Editor></Editor>
            </div>
        );
    }
}

export default App;
