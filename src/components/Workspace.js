import * as React from "react";
import Canvas from "./Canvas";
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Tag} from "@blueprintjs/core";
import EditableText from "./item-types/EditableText";

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
        this.deletePage = this.deletePage.bind(this);
        this.checkIfCurrentPageNoLongerExists = this.checkIfCurrentPageNoLongerExists.bind(this);
    }

    render() {
        // need to make sure if user deletes page we dont lose consistency 
        this.checkIfCurrentPageNoLongerExists();

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
                    <Button icon="delete" onClick={() => this.deletePage()}/>
                </div>
            </div>

        )
    }
//check if page doesnt exist 
    checkIfCurrentPageNoLongerExists() {
        let canvasData = this.props.docPath
            .reduce((acc, key) => acc[key], this.props.otDoc.data);

        //if we are in a brand new book
        if (!canvasData['pages']) {
            this.initPages();
        } else if (!canvasData['pages']['page'+this.state.page]) {
            this.setState({page: this.state.page = 0});
            alert('It looks like the page you were on no longer exists... someone must have deleted it');
        }
    }
//create new page 
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

    deletePage() {
        const pageCount = this.getNumberOfPagesInOTDoc();
        let confirmation = window.confirm("You are about to delete this entire page. Do you want to continue?");

        if (confirmation) {
            if (pageCount === 1) {
                const op = [...this.props.docPath, 'pages', 'page' + this.state.page, 'items', {r: 'items'}, {i: {}}];
                this.props.otDoc.submitOp(op);

            } else if (this.state.page === pageCount - 1) {
                let op = [[...this.props.docPath, 'pages', 'page' + this.state.page, {r: 'items'}]];
                this.props.otDoc.submitOp(op);

                this.decrementPage();

            } else {

                //delete the page
                let op = [...this.props.docPath, 'pages', ['page' + this.state.page, {r: 'items'}]];

                //rename the pages
                for (let i = this.state.page + 1; i < pageCount; i++) {
                    op.push(['page' + i, {p: i}]);
                    op.push(['page' + (i - 1), {d: i}]);
                }

                this.props.otDoc.submitOp(op);
            }
        }




    }

}



export default Workspace;

Workspace.prototypes = {
    otDoc: PropTypes.object.isRequired,
    docPath: PropTypes.array.isRequired
};
