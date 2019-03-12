import React, {Fragment} from "react";
import {Button, Icon} from "@blueprintjs/core";

class SideMenuItem extends React.Component {

    constructor(props) {
        super(props);
    }

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