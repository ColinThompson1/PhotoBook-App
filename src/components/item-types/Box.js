
import React from 'react'
import {asDraggable} from "../Draggable";
import ItemTypes from "./ItemTypes";

const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem'
};

class Box extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Insert Text'
        }
    }

    render() {
        return <div style={style}>{this.state.title}</div>
    }
}
export default asDraggable(Box, ItemTypes.BOX);