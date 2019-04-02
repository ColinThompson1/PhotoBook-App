import React from "react";
import SideMenu from "./SideMenu";
import MenuDetail from "./MenuDetail";
import EmojiItemsDetail from "./EmojiItemsDetail";
import EditableTextDetail from "./EditableTextDetail";
import ImageItemDetail from "./ImageItemDetail";
import PropTypes from 'prop-types';
import LeftPanelStyle from "../styles/LeftPanel.css";


class LeftPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'emoji'
        };

        this.panels = {
            'emoji': <EmojiItemsDetail/>,
            'text': <EditableTextDetail/>,
            'images': <ImageItemDetail otDoc={this.props.otDoc} otPath={this.props.otPath}/>
        };

        this.updateDetailView = this.updateDetailView.bind(this);
    }

    updateDetailView(itemLabel, e) {
        this.setState({activePanel: itemLabel});
    }

    render() {
        return (
            <div className={"left-panel"}>
                <SideMenu
                    onUpdate={this.updateDetailView}
                    activePanel={this.state.activePanel}
                />
                <MenuDetail>
                    {this.panels[this.state.activePanel] ? this.panels[this.state.activePanel] : <p>Nothing here yet</p>}
                </MenuDetail>
            </div>
        )
    }

}

export default LeftPanel;

LeftPanel.propTypes = {
    otDoc: PropTypes.object.isRequired,
    otPath: PropTypes.array.isRequired
};