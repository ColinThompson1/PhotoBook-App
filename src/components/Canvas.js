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
    'emoji': (id, left, top, data) => {
        return (
            <EmojiItem
                id={id}
                left={left}
                top={top}
                src={data.src}
                isOnCanvas={true}
                hideSourceOnDrag={true}
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
    }

    componentWillMount() {
        this.extractCanvasData();
    }

    componentDidMount() {
    }

    componentWillUpdate() {
        this.extractCanvasData();
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
                const {left, top, type, data} = this.items[key];
                return itemTypes[type](key, left, top, data);
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

    moveItem(id, left, top) {
        // Replace left and top
        const op = [...this.props.docPath, 'pages', 'page0', 'items', id, ['top', {r: top}, {i: top}], ['left', {r: left}, {i: left}]];
        this.props.otDoc.submitOp(op);
    }

    createItem(id, left, top, type, data) {

        // Init pages if not already created
        if (!this.canvasData['pages']) {
            const op = [...this.props.docPath, 'pages', {i: {'page0': {'items': {}}}}];
            this.props.otDoc.submitOp(op);
        }

        // Insert new item at id
        const op = [...this.props.docPath, 'pages', 'page0', 'items', id, {
            i: {
                top: top,
                left: left,
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