import React from "react";
import SideMenu from "./SideMenu";
import MenuDetail from "./MenuDetail";
import EmojiItemsDetail from "./EmojiItemsDetail";
import LeftPanelStyle from "../styles/LeftPanel.css";

const panels = {
    'emoji': <EmojiItemsDetail/>
};

class LeftPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'emoji'
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
                    {panels[this.state.activePanel] ? panels[this.state.activePanel] : <p>Nothing here yet</p>}
                </MenuDetail>
            </div>
        )
    }

}

export default LeftPanel;