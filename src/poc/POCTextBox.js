import React, {Fragment} from "react";
import {EditableText} from "@blueprintjs/core";

class POCTextBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.text !== nextProps.text;
    }

    handleChange(str) {
        this.props.onChange(str);
    }

    render() {
        return (
            <Fragment>
                <EditableText
                    onChange={this.handleChange}
                    multiline={true}
                    minLines={3}
                    maxLines={4}
                    value={this.props.text}
                />
            </Fragment>
        )
    }

}

export default POCTextBox