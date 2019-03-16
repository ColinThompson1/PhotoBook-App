import React from "react";
import SideMenu from "./SideMenu";
import MenuDetail from "./MenuDetail";
import LeftPanelStyle from "../styles/LeftPanel.css";

class LeftPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'templates'
        };

        this.updateDetailView = this.updateDetailView.bind(this);
        this.getSideMenuContent = this.getSideMenuContent.bind(this);
    }

    updateDetailView(itemLabel, e) {
        this.setState({currentTab: itemLabel});
    }

    getSideMenuContent() {
        return (
            <p>Placeholder for {this.state.currentTab}</p>
        )
    }

    render() {

        return (
            <div className={"left-panel"}>
                <SideMenu onUpdate={this.updateDetailView}/>
                <MenuDetail>
                    {this.getSideMenuContent()}
                </MenuDetail>
            </div>
        )
    }

}

export default LeftPanel;