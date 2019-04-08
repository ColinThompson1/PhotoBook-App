import React, {Component} from 'react';
import Background from '../images/back2.png';

import '../App.css';
import {Button, Text} from "@blueprintjs/core";
import Header from "./Header";



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
//homepage to let the user know what our app is about
class Homepage extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <section style={ sectionStyle }>
                    <br/>
                    <Text>PhotoBook</Text>
                    <section style={blurb}>
                        <Text>PhotoBook is a collaborative Photo Book creation tool.</Text>
                        <Text>Perfect for remembering the good times with family and friends.</Text>
                    </section>
                    <Button large={true} onClick={() => {window.location.href += "create";}}>Create a New Book</Button>
                </section>
            </div>
        );
    }

}

export default Homepage;
