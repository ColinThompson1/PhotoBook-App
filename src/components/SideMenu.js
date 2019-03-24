import React from "react";
import SideMenuItem from "./SideMenuItem";
import PropTypes from 'prop-types';

class SideMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            navItems: [
                {
                    key: 'templates',
                    icon: 'control',
                    label: 'Templates'
                },
                {
                    key: 'images',
                    icon: 'media',
                    label: 'Images'
                },
                {
                    key: 'text',
                    icon: 'new-text-box',
                    label: 'Text'
                },
                {
                    key: 'shapes',
                    icon: 'star',
                    label: 'Shapes'
                },
            ],
            activeItem: 'templates'
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(label, e) {
        this.setState({activeItem: label});
        if (this.props.onUpdate) {
            this.props.onUpdate(label, e);
        }
    }

    render() {

        let navItems = this.state.navItems.map((i) => {
            const active = this.state.activeItem === i.key;
            return (
                <SideMenuItem
                    key={i.label}
                    active={active}
                    icon={i.icon}
                    label={i.label}
                    onClick={(e) => this.handleSelect(i.key, e)}
                />
            )
        });

        return (
            <div className={"side-menu"}>
                <ul>
                    { navItems }
                </ul>
            </div>
        )
    }

}

export default SideMenu;

SideMenu.propTypes = {
  onUpdate: PropTypes.func
};