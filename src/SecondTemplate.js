import React, { Component } from 'react';
import './SecondTemplate.css';

import {Form, TextArea} from 'semantic-ui-react'
import{
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch

} from "@blueprintjs/core";



class SecondTemplate extends Component {
  render() {


    return (
    <body>  
      <div className="App">
 
          <div className = "topRight">
            <Form className = "textBox1">
              <TextArea placeholder='type here 1' />
           </Form>
           </div>
           <div className= "topLeft">
           <Form className = "textBox2">
              <TextArea placeholder = 'type here 2' />
            </Form>
            </div>
            <div className = "bottomRight">
              <Form className= "textBox3">
                <TextArea placeholder = "Enter inspiration here" font-size = "100" />
              </Form>
            </div>

          <div className = "bottomLeft">
            <img class = 'picTemplate' src = "https://upload.wikimedia.org/wikipedia/commons/c/c9/-Insert_image_here-.svg" alt="React logo" width =" 50" height = "50"></img>
            </div>
            
        </div>

    </body>
      
    );
  }
}
export default SecondTemplate;