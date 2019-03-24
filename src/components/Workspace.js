import * as React from "react";
import Canvas from "./Canvas";
import PropTypes from 'prop-types';

class Workspace extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"workspace"}>
                <Canvas
                    otDoc={this.props.otDoc}
                    docPath={this.props.docPath}
                    canvas={this.props.canvas}
                    page={0}
                />
            </div>
        )
    }

}

export default Workspace;

Workspace.prototypes = {
    otDoc: PropTypes.object.isRequired,
    docPath: PropTypes.array.isRequired
};