import React, {Fragment} from "react";
import {Icon} from "@blueprintjs/core";
import PropTypes from 'prop-types';

class SideMenuItem extends React.Component {
//if clicked change
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.active !== this.props.active;
    }

    render() {

        return (
            <Fragment>
                <li className={'side-menu-item' + (this.props.active ? ' active' : '')}>
                    <a onClick={this.props.onClick}>
                        <Icon icon={this.props.icon} iconSize={24} tagName={'i'}/>
                        <span>{this.props.label}</span>
                    </a>
                </li>
            </Fragment>
        )
    }

}

export default SideMenuItem;

SideMenuItem.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};
