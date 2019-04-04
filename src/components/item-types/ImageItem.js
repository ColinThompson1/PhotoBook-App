import React from "react";
import {asDraggable} from "../Draggable";
import ItemTypes from "./ItemTypes";
import PropTypes from 'prop-types';

const ImageItem = (props) => {
    return (
        <img id={props.id}
             className={'item-image'}
             src={props.src}
             alt={'user uploaded'}
        />
    );
};

export default asDraggable(ImageItem, ItemTypes.IMAGE);

ImageItem.propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onSendToBack: PropTypes.func,
    onBringToFront: PropTypes.func,
    onReturnToMiddle: PropTypes.func
};