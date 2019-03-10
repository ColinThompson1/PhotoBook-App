import React from "react";
import {Card} from "@blueprintjs/core";

import "./poc.css"

class POCTestCase extends React.Component {

    render() {
        const {name, ...props} = this.props;
        const Wrapped = this.props.other;
        return (
            <div className={"test-block"}>
                <Card interactive={true}>
                    <h4>{name}</h4>
                    {this.props.children}
                </Card>
            </div>
        )
    }
}

export default POCTestCase;