import * as React from "react";

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