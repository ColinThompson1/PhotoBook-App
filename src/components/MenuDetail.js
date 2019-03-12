import * as React from "react";
import PropTypes from 'prop-types';

class MenuDetail extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className={"menu-detail"}>
                {this.props.children}
            </div>
        )
    }

}

export default MenuDetail;

MenuDetail.proptypes = {
    children: PropTypes.node
};