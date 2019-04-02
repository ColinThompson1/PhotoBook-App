import * as React from "react";
import {DragSource} from "react-dnd";
import PropTypes from "prop-types";
import {Menu, Popover} from "@blueprintjs/core";


const canvasStyle = {
    cursor: 'move',
    position: 'absolute'
};
const sourceStyle = {
    cursor: 'move'
};

// A HOC for making our custom draggable items
function asDraggable(WrappedComponent, itemType) {

    const spec = {
        beginDrag(props) {
            const {id, left, top, initData} = props;
            return {id, left, top, itemType, initData}
        }
    };

    const DragItem = class extends React.Component {

        render() {
            const {
                hideSourceOnDrag,
                connectDragSource,
                isDragging,
                left,
                top,
                isOnCanvas
            } = this.props;

            if (isDragging && hideSourceOnDrag) {
                return null
            }

            return connectDragSource(
                <div style={{...(isOnCanvas ? canvasStyle : sourceStyle), top, left}}>
                    <Popover
                        content={
                            <Menu>
                                <Menu.Item icon="delete" onClick={this.props.onDelete} text="Delete item"/>
                            </Menu>
                        }
                        position={"bottom"} usePortal={true}>
                        <WrappedComponent {...this.props}/>
                    </Popover>

                </div>
            )
        }
    };

    return DragSource(itemType, spec, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))(DragItem)
}



export {
    asDraggable
};

asDraggable.propTypes = {
    isOnCanvas: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    initData: PropTypes.object.isRequired
};