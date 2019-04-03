import React from "react";
import ItemTypes from "./item-types/ItemTypes";
import {DropTarget} from "react-dnd";
import Box from "./item-types/Box";
import {getElementOffset} from "../util/general-util.js"
import * as uuid from "uuid";
import PropTypes from 'prop-types';
import EmojiItem from "./item-types/EmojiItem";
import CanvasStyle from "../styles/Canvas.css";


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

            component.moveItem(item.id, left, top)
        } else {
            const canvasOffset = component.getOffset();
            const left = Math.round(delta.x - canvasOffset.left + initOffset.x);
            const top = Math.round(delta.y - canvasOffset.top + initOffset.y);

            component.createItem(item.id + uuid.v4(), left, top, item.itemType, item.initData);
        }
    },
};

const itemTypes = {
    'BOX': (id, left, top, data) => {
    },
    'emoji': (id, left, top, data, zIndex, canvas) => {
        return (

             <EmojiItem
                 id={id}
                 left={left}
                 top={top}
                 zIndex={zIndex}
                 src={data.src}
                 isOnCanvas={true}
                 hideSourceOnDrag={true}
                 onDelete={() => canvas.deleteItem(id)}
                 onSendToBack={() => canvas.sendToBack(id, zIndex)}
                 onBringToFront={() => canvas.bringToFront(id, zIndex)}
             />
        )
    }
};

class Canvas extends React.Component {

    constructor() {
        super(...arguments);
        this.canvasRef = React.createRef();

        this.extractCanvasData = this.extractCanvasData.bind(this);
        this.getCanvasElements = this.getCanvasElements.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.sendToBack = this.sendToBack.bind(this);
        this.bringToFront = this.bringToFront.bind(this);

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
            </div>,

        )
    }

    getCanvasElements() {
        if (this.items) {
            return Object.keys(this.items).map(key => {
                const {left, top, type, data, zIndex} = this.items[key];
                return itemTypes[type](key, left, top, data, zIndex, this);
                return (
                    <Box
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                        hideSourceOnDrag={true}
                        isOnCanvas={true}
                    />
                )
            });
        }
    }

    deleteItem(id) {
        //delete the item
        const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, {r: id} ]
        this.props.otDoc.submitOp(op);

    }

    sendToBack(id, zIndex) {
        const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, ['zIndex', {r: zIndex}, {i: 0}]];
        this.props.otDoc.submitOp(op);

    }


    bringToFront(id, zIndex) {
        //z-index 2 will be top most element
        const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, ['zIndex', {r: zIndex}, {i: 2}]];
        this.props.otDoc.submitOp(op);

    }

    moveItem(id, left, top) {
        // Replace left and top
        const op = [...this.props.docPath, 'pages', `page${this.props.page}`, 'items', id, ['top', {r: top}, {i: top}], ['left', {r: left}, {i: left}]];
        this.props.otDoc.submitOp(op);
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
                data: data
            }
        }];
        this.props.otDoc.submitOp(op);
    }

    getOffset() {
        return getElementOffset(this.canvasRef.current);
    }

}

export default DropTarget(ItemTypes.EMOJI, spec, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(Canvas)

Canvas.propTypes = {
    otDoc: PropTypes.object.isRequired,
    docPath: PropTypes.array.isRequired,
    page: PropTypes.number
};