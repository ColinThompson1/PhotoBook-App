import * as React from "react";
import Canvas from "./Canvas";
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Tag} from "@blueprintjs/core";



class Workspace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };

        this.getNumberOfPagesInOTDoc = this.getNumberOfPagesInOTDoc.bind(this);
        this.decrementPage = this.decrementPage.bind(this);
        this.incrementPage = this.incrementPage.bind(this);
        this.addPage = this.addPage.bind(this);
        this.initPages = this.initPages.bind(this);

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
                <div className={"pageControls"}>
                    <Button icon="chevron-left" onClick={() => this.decrementPage()}/>
                    <Tag large={true}>Page: {this.state.page}</Tag>
                    <Button icon="chevron-right" onClick={() => this.incrementPage()}/>
                    <Button icon="add" onClick={() => this.addPage()}/>
                </div>
            </div>

        )
    }

    initPages() {
        const op = [...this.props.docPath, 'pages', {i: {'page0': {'items': {}}}}];
        this.props.otDoc.submitOp(op);
    }

    getNumberOfPagesInOTDoc() {
        let canvasData = this.props.docPath
            .reduce((acc, key) => acc[key], this.props.otDoc.data);

        //check if any pages exist and initialize some if they don't
        if (!canvasData['pages']) {
            this.initPages();
            canvasData = this.props.docPath
                .reduce((acc, key) => acc[key], this.props.otDoc.data);
        }
        return Object.keys(canvasData['pages']).length;
    }

    decrementPage() {
        if (this.state.page > 0)
            this.setState({page: this.state.page -= 1})
    }

    incrementPage() {
        const pageCount = this.getNumberOfPagesInOTDoc();

        if (this.state.page < pageCount -1)
            this.setState({page: this.state.page += 1})
    }

    addPage() {
        const pageCount = this.getNumberOfPagesInOTDoc();
        const newpage = 'page' + pageCount; //since pageCount is not 0 indexed

        const op = [...this.props.docPath, 'pages', newpage, {i: {'items': {}}}];

        this.props.otDoc.submitOp(op);

        this.setState({page: this.state.page = pageCount})

    }

}



export default Workspace;

Workspace.prototypes = {
    otDoc: PropTypes.object.isRequired,
    docPath: PropTypes.array.isRequired
};