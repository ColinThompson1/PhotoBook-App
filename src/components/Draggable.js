import * as React from "react";
import {DragSource} from "react-dnd";
import ItemTypes from "./item-types/ItemTypes";

const style = {
  position: 'absolute',
  cursor: 'move'
};

// A HOC for making our custom draggable items
function asDraggable(WrappedComponent) {

    const spec = {
        beginDrag(props) {
            const { id, left, top } = props;
            return { id, left, top }
        }
    };

    const DragItem = class extends React.Component {

        render() {
            const {
                hideSourceOnDrag,
                connectDragSource,
                isDragging,
                left,
                top
            } = this.props;

            if (isDragging && hideSourceOnDrag) {
                return null
            }

            return connectDragSource(
                <div style={{...style, top, left}}>
                    <WrappedComponent/>
                </div>
            )
        }
    };

    return DragSource(ItemTypes.BOX, spec, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))(DragItem)
}

export {
    asDraggable
};