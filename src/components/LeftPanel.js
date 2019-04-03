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
        
        this.updateDetailView = this.updateDetailView.bind(this);
        this.getPanel = this.getPanel.bind(this);
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
                    {this.getPanel(this.state.activePanel)}
                </MenuDetail>
            </div>
        )
    }

    getPanel(panel) {
        switch(panel) {
            case 'emoji':
                return <EmojiItemsDetail/>;
            case 'text':
                return <EditableTextDetail/>;
            case 'images':
                return <ImageItemDetail otDoc={this.props.otDoc} otPath={this.props.otPath}/>;
            default:
                return <p>Nothing here yet</p>
        }
    }

}

export default LeftPanel;

LeftPanel.propTypes = {
    otDoc: PropTypes.object.isRequired,
    otPath: PropTypes.array.isRequired
};