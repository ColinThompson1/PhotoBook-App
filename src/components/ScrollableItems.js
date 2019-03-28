import React from "react";

const ScrollableItems = (props) => {

    function getItems() {
        return props.children.map((item) => {
            return (
                <div key={item.key} className={'scrollable-item'}>
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
