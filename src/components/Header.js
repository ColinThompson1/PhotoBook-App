import React, {Fragment} from "react";
import {Button, Navbar} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/cjs/common/alignment";
import axios from "axios";
import ReactDOM from "react-dom";
import Login from "../Login";
import CreateBook from "../CreateBook";

function LoginFunc() {
    axios.post("/user/logout");
    ReactDOM.render(<Login />, document.getElementById('root'));
}

function BookFunc(){
    ReactDOM.render(<CreateBook />, document.getElementById('root'));
}


class Header extends React.Component {

    render() {
        return (
            <Fragment>
                <Navbar className="bp3-dark">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>MixMem</Navbar.Heading>
                    </Navbar.Group>

                    <Navbar.Group align={Alignment.RIGHT}>
                        <Button className='bp3-minimal' icon='home' text='Home' onClick={BookFunc}/>
                        <Button className="bp3-minimal" icon="log-out" text="Logout" onClick={LoginFunc} />
                    </Navbar.Group>
                </Navbar>
            </Fragment>
        )
    }
}

export default Header;