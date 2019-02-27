import React from "react";
import {Card} from "@blueprintjs/core";

import "./poc.css"

export function asTestCase(WrappedComponent) {

    return class extends React.Component {

        render() {
            const {name, ...props} = this.props;
            return (
                <div className={"test-block"}>
                    <Card interactive={true}>
                        <h4>{name}</h4>
                        <WrappedComponent {...props}/>
                    </Card>
                </div>
            )
        }
    }
}