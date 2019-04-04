import * as React from "react";
import ContentEditable from "react-contenteditable";
import PropTypes from "prop-types";
import {asDraggable} from "../Draggable";
import ItemTypes from "./ItemTypes";

let baseStyle = {};

const editStyle = {
    border: 'dashed 2px #065A82',
    resize: 'both'
};

class EditableText extends React.Component {

    constructor(props) {
        super(props);

        this.contentEditable = React.createRef();
        this.state = {
            isEditable: false
        };

        baseStyle = {
            height: this.props.height,
            width: this.props.width,
            overflow: 'hidden',
        };

        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        if (this.state.isEditable && this.props.isOnCanvas) {
            this.contentEditable.current.focus();
        }
    }

    handleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e.target.value)
        }
    };

    handleDoubleClick() {
        this.setState({...this.state, isEditable: true});
    }

    //After editable text has been left
    handleBlur() {
        this.setState({...this.state, isEditable: false});
        this.props.onResize(document.getElementById(this.props.id).style.height, document.getElementById(this.props.id).style.width);
    }

    render() {
        if (this.props.isOnCanvas) {
            const style = {
                ...baseStyle,
                ...this.props.textStyle,
                ...(this.state.isEditable ? editStyle : {})
            };
            return (
                <ContentEditable
                    id={this.props.id}
                    style={style}
                    innerRef={this.contentEditable}
                    html={this.props.text}
                    disabled={!this.state.isEditable}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onDoubleClick={this.handleDoubleClick}
                />
            )
        } else {
            return (
                <p style={this.props.textStyle}>
                    {this.props.displayName}
                </p>
            )
        }
    }
}

export default asDraggable(EditableText, ItemTypes.EDITABLE_TEXT);

EditableText.propType = {
    isOnCanvas: PropTypes.bool.isRequired,
    displayName: PropTypes.string.isRequired,
    textStyle: PropTypes.object,
    onChange: PropTypes.func,
    text: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    onDelete: PropTypes.func,
    onSendToBack: PropTypes.func,
    onBringToFront: PropTypes.func,
    onReturnToMiddle: PropTypes.func,
    onResize: PropTypes.func
};