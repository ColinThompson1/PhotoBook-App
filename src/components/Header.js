import React, {Fragment} from "react";
import {Navbar} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/cjs/common/alignment";

class Header extends React.Component {

    render() {
        return (
            <Fragment>
                <Navbar className="bp3-dark">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>PhotoBook Maker</Navbar.Heading>
                    </Navbar.Group>
                </Navbar>
            </Fragment>
        )
    }
}

export default Header;