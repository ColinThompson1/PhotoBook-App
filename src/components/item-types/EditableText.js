import * as React from "react";
import ContentEditable from "react-contenteditable";
import PropTypes from "prop-types";
import {asDraggable} from "../Draggable";
import ItemTypes from "./ItemTypes";
const json1 = require('ot-json1');

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
        this.updateCaretPosition = this.updateCaretPosition.bind(this);
        this.handleTextInsert = this.handleTextInsert.bind(this);
        this.handleGeneralKey = this.handleGeneralKey.bind(this);
        this.checkTextLength = this.checkTextLength.bind(this);

        this.caretPosition = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidMount() {
        if (this.props.isOnCanvas) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // The ContentEditable component events did not work for some reason
        this.contentEditable.current.addEventListener('keydown', this.updateCaretPosition, false);
        this.contentEditable.current.addEventListener('keyup', this.updateCaretPosition, false);
        this.contentEditable.current.addEventListener('mousedown', this.updateCaretPosition, false);
        this.contentEditable.current.addEventListener('mouseup', this.updateCaretPosition, false);
        this.contentEditable.current.addEventListener('keydown', (e) => this.handleGeneralKey(e.keyCode), false);
        this.contentEditable.current.addEventListener('keypress', (e) => {
            // console.log('inserting char  ' + String.fromCharCode(e.which) + ' at position' + this.caretPosition.start);
            this.handleTextInsert(String.fromCharCode(e.which));
            e.preventDefault();
        });
    }

    handleTextInsert(key) {
        if (this.caretPosition.start === this.caretPosition.end) {
            const op = json1.editOp(['text'], 'text-unicode', [this.caretPosition.start, key])
            this.props.submit(op)
        } else {
            //todo
        }
    }

    handleGeneralKey(keyCode) {
        if (keyCode === 46) {
            // console.log('delete key')
            const op = json1.editOp(['text'], 'text-unicode', [this.caretPosition.start, {d:1}]);
            this.props.submit(op);
        } else if (keyCode === 8) {
            // console.log('backspace');
            if (this.caretPosition.start > 0) {
                const op = json1.editOp(['text'], 'text-unicode', [this.caretPosition.start - 1, {d:1}]);
                this.props.submit(op);
            }
        }
    }

    checkTextLength() {
        if (this.caretPosition.start > this.props.text.length || this.caretPosition.end > this.props.text.length) {
            this.caretPosition.start = 0;
            this.caretPosition.end = 0;
        }
    }

    componentDidUpdate() {
        if (this.state.isEditable && this.props.isOnCanvas) {
            this.contentEditable.current.focus();

            const el = this.contentEditable.current;
            const range = document.createRange();
            const sel = window.getSelection();

            range.setStart(el.childNodes[0], this.caretPosition.start);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    handleDoubleClick() {
        this.setState({...this.state, isEditable: true});
    }

    //After editable text has been left
    handleBlur() {
        this.setState({...this.state, isEditable: false});
        this.props.onResize(document.getElementById(this.props.id).style.height, document.getElementById(this.props.id).style.width);
    }

    updateCaretPosition() {
        const element = this.contentEditable.current;
        var start = 0;
        var end = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.startContainer, range.startOffset);
                start = preCaretRange.toString().length;
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                end = preCaretRange.toString().length;
            }
        } else if ( (sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToStart", textRange);
            start = preCaretTextRange.text.length;
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            end = preCaretTextRange.text.length;
        }
        this.caretPosition = { start: start, end: end };
            // console.log('Caret Position: ' + this.caretPosition.start + ' : ' + this.caretPosition.end);
    }

    render() {
        if (this.props.isOnCanvas) {
            const style = {
                ...baseStyle,
                ...this.props.textStyle,
                ...(this.state.isEditable ? editStyle : {})
            };
            return (
                <div
                    id={this.props.id}
                    style={style}
                    contentEditable={this.state.isEditable && this.props.isOnCanvas}
                    ref={this.contentEditable}
                    onBlur={this.handleBlur}
                    onDoubleClick={this.handleDoubleClick}
                    dangerouslySetInnerHTML={{__html: this.props.text}}
                >
                </div>
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
    text: PropTypes.string,
    submit: PropTypes.func.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
    onDelete: PropTypes.func,
    onSendToBack: PropTypes.func,
    onBringToFront: PropTypes.func,
    onReturnToMiddle: PropTypes.func,
    onResize: PropTypes.func
};