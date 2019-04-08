import React from "react";
import ItemTypes from "./item-types/ItemTypes";
import {DropTarget} from "react-dnd";
import {getElementOffset} from "../util/general-util.js"
import * as uuid from "uuid";
import PropTypes from 'prop-types';
import EmojiItem from "./item-types/EmojiItem";
import EditableText from "./item-types/EditableText";
import TextTypes from "./TextTypes";
import ImageItem from "./item-types/ImageItem";
import CanvasStyle from "../styles/Canvas.css";

//code for dragging items
const spec = {
    drop(props, monitor, component) {
        if (!component) {
            return
        }
        const item = monitor.getItem();
        const delta = monitor.getDifferenceFromInitialOffset();
        const initOffset = monitor.getInitialSourceClientOffset();

        if (component.items && component.items[item.id]) {
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);

            component.moveItem(item.id, left, top);
        } else {
            const canvasOffset = component.getOffset();
            const left = Math.round(delta.x - canvasOffset.left + initOffset.x);
            const top = Math.round(delta.y - canvasOffset.top + initOffset.y);

            component.createItem(item.id + '_' + uuid.v4(), left, top, item.itemType, item.initData);
        }
    },
};
//making our canvas
class Canvas extends React.Component {

    constructor() {
        super(...arguments);
        this.canvasRef = React.createRef();

        // Lookup for functions for each type. Some form of registration would be pretty slick
        //define draggable types 
         this.itemTypes = {
            'emoji': (id, left, top, data, zIndex, canvas) => {
                return (
                    <EmojiItem
                        id={id}
                        key={id}
                        left={left}
                        top={top}
                        zIndex={zIndex}
                        src={data.src}
                        isOnCanvas={true}
                        hideSourceOnDrag={true}
                        onDelete={() => canvas.deleteItem(id)}
                        onSendToBack={() => canvas.sendToBack(id, zIndex)}
                        onBringToFront={() => canvas.bringToFront(id, zIndex)}
                        onReturnToMiddle={() => canvas.returnToMiddle(id, zIndex)}
                    />
                )
            },
            'editableText': (id, left, top, data, zIndex, canvas) => {
                const tt = TextTypes[data.type];
                return (
                    <EditableText
                        id={id}
                        key={id}
                        left={left}
                        top={top}
                        isOnCanvas={true}
                        displayName={tt.displayName}
                        textStyle={tt.style}
                        text={data.text}
                        onChange={(text) => {
                            const relativeOp = ['text', {r: {}, i: text}];
                            this.submitDataOp(id, relativeOp);
                        }}
                        zIndex={zIndex}
                        height={data.height}
                        width={data.width}
                        onDelete={() => canvas.deleteItem(id)}
                        onSendToBack={() => canvas.sendToBack(id, zIndex)}
                        onBringToFront={() => canvas.bringToFront(id, zIndex)}
                        onReturnToMiddle={() => canvas.returnToMiddle(id, zIndex)}
                        onResize={(h, w) => {
                            const relativeOp = [['height', {r: {}, i: h}],['width', {r: {}, i: w}]];
                            this.submitDataOp(id, relativeOp);
                        }}
                    />
                )
            },
            'image': (id, left, top, data, zIndex, canvas) => {
                return (
                    <ImageItem
                        id={id}
                        key={id}
                        left={left}
                        top={top}
                        isOnCanvas={true}
                        hideSourceOnDrag={true}
                        src={data.src}
                        zIndex={zIndex}
                        onDelete={() => canvas.deleteItem(id)}
                        onSendToBack={() => canvas.sendToBack(id, zIndex)}
                        onBringToFront={() => canvas.bringToFront(id, zIndex)}
                        onReturnToMiddle={() => canvas.returnToMiddle(id, zIndex)}
                    />
                )
            }
        };
        this.extractCanvasData = this.extractCanvasData.bind(this);
        this.getCanvasElements = this.getCanvasElements.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.sendToBack = this.sendToBack.bind(this);
        this.bringToFront = this.bringToFront.bind(this);
        this.returnToMiddle = this.returnToMiddle.bind(this);
        this.submitDataOp = this.submitDataOp.bind(this);
    }

    componentWillMount() {
    }



    extractCanvasData() {
        // Get the relevant canvas data from the ot document
        this.canvasData = this.props.docPath
            .reduce((acc, key) => acc[key], this.props.otDoc.data);

        if (this.canvasData['pages']) {
            const {items} = this.canvasData['pages']['page' + this.props.page];
            this.items = items;
        }
    }

    render() {
        this.extractCanvasData();

        const {connectDropTarget} = this.props;

        return connectDropTarget(
            <div className={'canvas corner-page-shadow-br'} ref={this.canvasRef}>
                <div>
                    {this.getCanvasElements()}
                </div>
            </div>
        )
    }

    getCanvasElements() {
        if (this.items) {
            return Object.keys(this.items).map(key => {
                const {left, top, type, data, zIndex} = this.items[key];
                return this.itemTypes[type](key, left, top, data, zIndex, this);
            });
        }
    }

//Code to move components that are layered
    returnToMiddle(id, zIndex) {
        if (!this.canvasData['pages'][`page${this.props.page}`]['items'][id]){
            return;
        }
        else {
            const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, ['zIndex', {r: zIndex}, {i: 1}]];
            this.props.otDoc.submitOp(op);
        }
    }

    sendToBack(id, zIndex) {
        if (!this.canvasData['pages'][`page${this.props.page}`]['items'][id]){
            return;
        }
        else {
            const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, ['zIndex', {r: zIndex}, {i: 0}]];
            this.props.otDoc.submitOp(op);
        }
    }

    bringToFront(id, zIndex) {
        //z-index 2 will be top most element
        if (!this.canvasData['pages'][`page${this.props.page}`]['items'][id]){
            return;
        }
        else {
            const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, ['zIndex', {r: zIndex}, {i: 2}]];
            this.props.otDoc.submitOp(op);
        }

    }

    moveItem(id, left, top) {
        // Replace left and top
        if (!this.canvasData['pages'][`page${this.props.page}`]['items'][id]){
            return;
        }
        else {
            const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, ['top', {r: top}, {i: top}], ['left', {r: left}, {i: left}]];
            this.props.otDoc.submitOp(op);
        }
    }

    deleteItem(id) {
        //delete the item
        if (!this.canvasData['pages'][`page${this.props.page}`]['items'][id]){
            return;
        }
        else {
            const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, {r: id}]
            this.props.otDoc.submitOp(op);
        }

    }

    createItem(id, left, top, type, data) {

        // Init pages if not already created
        if (!this.canvasData['pages']) {
            const op = [...this.props.docPath, 'pages', {i: {'page0': {'items': {}}}}];
            this.props.otDoc.submitOp(op);
        }

        // Insert new item at id
        const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, {
            i: {
                top: top,
                left: left,
                zIndex: 1,
                type: type,
                data: data,
                height: 1,
                width: 1
            }
        }];
        this.props.otDoc.submitOp(op);
    }

    getOffset() {
        return getElementOffset(this.canvasRef.current);
    }

    // Takes an op relative to the element's root
    submitDataOp(id, relativeOp) {
        const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, 'data', ...relativeOp];
        this.props.otDoc.submitOp(op);
    }

}
//drag and drop items
export default DropTarget([ItemTypes.EMOJI, ItemTypes.EDITABLE_TEXT, ItemTypes.IMAGE], spec, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(Canvas)

Canvas.propTypes = {
    otDoc: PropTypes.object.isRequired,
    docPath: PropTypes.array.isRequired,
    page: PropTypes.number
};
