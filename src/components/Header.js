import React, {Fragment} from "react";
import {Button, Navbar} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/cjs/common/alignment";
import axios from "axios";
import ReactDOM from "react-dom";
import Login from "../Login";
import CreateBook from "./CreateBook";

//not being used
function LoginFunc() {
    axios.post("/user/logout");
    ReactDOM.render(<Login />, document.getElementById('root'));
}
//displays create book
function BookFunc(){
    ReactDOM.render(<CreateBook />, document.getElementById('root'));
}

//making a header for our webpage
class Header extends React.Component {

    render() {
        return (
            <Fragment>
                <Navbar className="bp3-dark">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>
                            <a href={"/"}> PhotoBook</a>
                        </Navbar.Heading>
                    </Navbar.Group>

                    <Navbar.Group align={Alignment.RIGHT}>
                        <Button className='bp3-minimal' icon='add' text='New Book' onClick={BookFunc}/>
                    </Navbar.Group>
                </Navbar>
            </Fragment>
        )
    }
}

export default Header;
