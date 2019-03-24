import React from "react";
import SideMenu from "./SideMenu";
import MenuDetail from "./MenuDetail";
import Box from "./item-types/Box";
import LeftPanelStyle from "../styles/LeftPanel.css";

const style = {
  position: 'relative'
};

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
            <div style={style}>
                <Box
                    key={1}
                    id={'c'}
                    left={0}
                    top={0}
                    hideSourceOnDrag={false}
                />
            </div>
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