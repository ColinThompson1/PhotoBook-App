import React from "react";
import conn from "../sharedb";
import LeftPanel from "./LeftPanel";
import Workspace from "./Workspace";
import {Spinner} from "@blueprintjs/core";
import EditorStyle from "../styles/MainEditor.css";

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doc: {
                canvas: {},
                panel: {}
            },
            isLoading: true
        };
        this.otDoc = null;
        this.handleCanvasUpdate = this.handleCanvasUpdate.bind(this);
        this.handleInitData = this.handleInitData.bind(this);
        this.handleOTUpdate = this.handleOTUpdate.bind(this);
    }


    componentDidMount() {
        conn.debug = true;
        this.otDoc = conn.get('doc', this.props.id);
        this.otDoc.subscribe();
        this.otDoc.on('load', this.handleOTUpdate);
        this.otDoc.on('op', this.handleOTUpdate)
    }

    handleInitData() {
        this.setState({...this.state, doc: this.otDoc.data.doc, isLoading: false});
    }

    handleOTUpdate() {
        if (this.state.isLoading === true)
            this.setState({...this.state, doc: this.otDoc.data.doc, isLoading: false});
        else
            this.setState({...this.state, doc: this.otDoc.data.doc});
    }

    handleCanvasUpdate(canvas) {
        const op = ['doc', 'canvas', [{r: {}}], [{i: canvas}]];
        this.otDoc.submitOp(op)
    }

    render() {
        if (this.state.isLoading) {
            return (
                    <div className="editor-loading">
                        <Spinner intent={'primary'} size={Spinner.SIZE_LARGE}/>
                    </div>
                );
        } else {
            return (
                <div className="editor">
                    <LeftPanel otDoc={this.otDoc} otPath={['doc', 'panel']}/>
                    <Workspace otDoc={this.otDoc} docPath={['doc', 'canvas']}
                    />
                </div>
            );
        }
    }

}

export default Editor;