import React, {Fragment} from "react";
import {asTestCase} from "./POCTestCase.js";

import "./poc.css"
import {Checkbox, EditableText, NumericInput} from "@blueprintjs/core";

class POCCanvas extends React.Component {

    render() {
        const BooleanTest = asTestCase(props => <Checkbox/>);
        const StringTest = asTestCase(props => <EditableText multiline={true} minLines={3} maxLines={4}/>);
        const NumericTest = asTestCase(props => <NumericInput/>);

        return (
            <div className={"test-container"}>
                <BooleanTest name={"Check Box Test"}/>
                <StringTest name={"Text Area Test"}/>
                <NumericTest name={"Slider Test"}/>
            </div>
        )
    }

}

export default POCCanvas;