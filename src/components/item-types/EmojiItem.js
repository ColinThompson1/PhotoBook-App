import React from "react";
import {asDraggable} from "../Draggable";
import PropTypes from 'prop-types';
import ItemTypes from "./ItemTypes";

const EmojiItem = (props) => {
    return (
        <img id={props.id}
             className={'item-image'}
             src={props.src}
             alt={props.id + ' emoji'}
        />
    )
};

export default asDraggable(EmojiItem, ItemTypes.EMOJI);

EmojiItem.propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onSendToBack: PropTypes.func,
    onBringToFront: PropTypes.func
};