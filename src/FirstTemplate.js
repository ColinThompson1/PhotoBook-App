import React, { Component } from 'react';
import './FirstTemplate.css';
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



class FirstTemplate extends Component {
  render() {


    return (
    <body>  
      <div className="App">     
          <div className = "topRight">
            <Form className = "textBox1">
              <TextArea placeholder='Tell us: Whose in the photos' />
           </Form>
           </div>
           <div className= "topLeft">
           <Form className = "textBox2">
              <TextArea placeholder = 'Whats the story behind these photos' />
            </Form>
            </div>
            <div className = "Middle">
              <Form className= "textBox3">
                <TextArea placeholder = "Enter inspiration here" font-size = "100" />
              </Form>
            </div>

          <div className = "bottomLeft">
            <img class = 'picTemplate' src = "https://upload.wikimedia.org/wikipedia/commons/c/c9/-Insert_image_here-.svg" alt="React logo" width =" 50" height = "50"></img>
            </div>
            <div className = "bottomRight">
              <img class = 'picTemplateTwo' src = "http://catphotos.org/wp-content/uploads/2011/09/baby_kitten-8364.jpg" alt="React logo" width =" 50" height = "50"></img>
            </div>
        </div>

      


    </body>
      
    );
  }
}
export default FirstTemplate;