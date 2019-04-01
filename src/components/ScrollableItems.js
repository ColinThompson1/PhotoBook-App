import React from "react";
import PropTypes from "prop-types";

const ScrollableItems = (props) => {

    function getItems() {
        return props.children.map((item) => {
            return (
                <div key={item.key}
                     className={'scrollable-item ' + props.classNames}>
                    {item}
                </div>
            )
        });
    }

    return (
        <div className={'scrollable-detail-items'}>
            {getItems()}
        </div>
    )
};

export default ScrollableItems;

ScrollableItems.propTypes = {
    classNames: PropTypes.string
};
