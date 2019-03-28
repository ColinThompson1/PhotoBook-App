import React from "react";
import SideMenuItem from "./SideMenuItem";
import PropTypes from 'prop-types';

const navItems = [
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
    {
        key: 'emoji',
        icon: 'heart',
        label: 'Emoji'
    },
];

class SideMenu extends React.Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(label, e) {
        if (this.props.onUpdate) {
            this.props.onUpdate(label, e);
        }
    }

    render() {

        let menuItems = navItems.map((i) => {
            const active = this.props.activePanel === i.key;
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
                    {menuItems}
                </ul>
            </div>
        )
    }

}

export default SideMenu;

SideMenu.propTypes = {
    onUpdate: PropTypes.func,
    activePanel: PropTypes.string.isRequired
};