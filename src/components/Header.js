import React, {Fragment} from "react";
import {Button, Navbar} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/cjs/common/alignment";

class Header extends React.Component {

    render() {
        return (
            <Fragment>
                <Navbar className="bp3-dark">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>MixMem</Navbar.Heading>
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>
                        <Button className="bp3-minimal" icon={"document"} text={this.props.name}/>
                        <Navbar.Divider/>
                        <Button className="bp3-minimal" icon={"user"}/>
                        <Button className="bp3-minimal" icon={"cog"}/>
                    </Navbar.Group>
                </Navbar>
            </Fragment>
        )
    }
}

export default Header;