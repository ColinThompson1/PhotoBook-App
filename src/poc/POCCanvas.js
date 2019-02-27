import React from "react";
import {asTestCase} from "./POCTestCase.js";

import "./poc.css"
import POCTextBox from "./POCTextBox";
import POCTestCase from "./POCTestCase";

class POCCanvas extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.data !== nextProps.data;
    }

    handleChange(item, change) {
        console.log(this.props.data);
        this.props.onChange({...this.props.data, [item]: change})
    }

    render() {

        return (
            <div className={"test-container"}>
                <POCTestCase name={"Text Area Test2"}><POCTextBox text={this.props.data.test1} onChange={(change) => this.handleChange('test1', change)}/></POCTestCase>
                <POCTestCase name={"Text Area Test1"}><POCTextBox text={this.props.data.test1} onChange={(change) => this.handleChange('test1', change)}/></POCTestCase>
            </div>
        )
    }

}

export default POCCanvas;