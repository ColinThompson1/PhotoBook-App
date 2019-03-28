import * as React from "react";
import Canvas from "./Canvas";
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from "@blueprintjs/core";



class Workspace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };
    }

    render() {
        return (
            <div className={"workspace"}>
                <Canvas
                    otDoc={this.props.otDoc}
                    docPath={this.props.docPath}
                    canvas={this.props.canvas}
                    page={this.state.page}
                />
                <div>
                    <Button icon="chevron-left" onClick={() => {
                        if (this.state.page > 0)
                            this.setState({page: this.state.page -= 1})
                    }}/>
                    <Button icon="chevron-right" onClick={() => {
                        const canvasData = this.props.docPath
                            .reduce((acc, key) => acc[key], this.props.otDoc.data);

                        const pageCount = canvasData['pages'].length;

                        console.log(pageCount);

                        if (this.state.page < pageCount -1)
                            this.setState({page: this.state.page += 1})
                    }}/>
                    <Button icon="add" onClick={() => {
                        const canvasData = this.props.docPath
                            .reduce((acc, key) => acc[key], this.props.otDoc.data);
                        const pageCount = canvasData['pages'].length;
                        const newpage = 'page' + pageCount+1;
                        console.log(newpage);

                        const op = [...this.props.docPath, 'pages', 'page1', {i: {'items': {}}}];
                        console.log(op);

                        this.props.otDoc.submitOp(op);

                        //this.setState({page: this.state.page = 1})

                    }}/>
                </div>
            </div>

        )
    }

}

export default Workspace;

Workspace.prototypes = {
    otDoc: PropTypes.object.isRequired,
    docPath: PropTypes.array.isRequired
};