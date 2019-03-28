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
                        const pageCount = this.getNumberOfPagesInOTDoc();

                        if (this.state.page < pageCount -1)
                            this.setState({page: this.state.page += 1})
                    }}/>
                    <Button icon="add" onClick={() => {
                        const pageCount = this.getNumberOfPagesInOTDoc();
                        const newpage = 'page' + pageCount; //since pageCount is not 0 indexed
                        console.log(newpage);

                        const op = [...this.props.docPath, 'pages', newpage, {i: {'items': {}}}];
                        console.log(op);

                        this.props.otDoc.submitOp(op);

                        this.setState({page: this.state.page = pageCount})

                    }}/>
                </div>
            </div>

        )
    }

    getNumberOfPagesInOTDoc() {
        const canvasData = this.props.docPath
            .reduce((acc, key) => acc[key], this.props.otDoc.data);

        return Object.keys(canvasData['pages']).length;
    }

}



export default Workspace;

Workspace.prototypes = {
    otDoc: PropTypes.object.isRequired,
    docPath: PropTypes.array.isRequired
};