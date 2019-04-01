import React from "react";
import {asDraggable} from "../Draggable";
import PropTypes from 'prop-types';
import ItemTypes from "./ItemTypes";

const ImageItem = (props) => {
    return (
        <img id={props.id}
             className={'item-image'}
             src={props.src}
             alt={props.id + ' image'}
        />
    )
};

export default asDraggable(ImageItem, ItemTypes.IMAGE);


ImageItem.propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
};