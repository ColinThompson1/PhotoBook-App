import React from "react";
import POCCanvas from "../poc/POCCanvas";
import conn from "../sharedb";
import LeftPanel from "./LeftPanel";
import Canvas from "./Canvas";

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doc: {
                canvas: {}
            }
        };
        this.otdoc = null;
        this.handleCanvasUpdate = this.handleCanvasUpdate.bind(this);
        this.handleOTUpdate = this.handleOTUpdate.bind(this);
    }


    componentDidMount() {
        conn.debug = true;
        this.otdoc = conn.get('doc', '8e92d720-605c-4f44-961f-b35d5982f099');
        this.otdoc.subscribe();
        this.otdoc.on('load', this.handleOTUpdate);
        this.otdoc.on('op', this.handleOTUpdate)
    }

    componentWillUnmount() {}

    handleOTUpdate() {
        this.setState({...this.state, doc: this.otdoc.data.doc});
    }

    handleCanvasUpdate(canvas) {
        const op = ['doc', 'canvas', [{r: {}}], [{i: canvas}]];
        this.otdoc.submitOp(op)
    }

    render() {
        return (
            <div className="editor">
                {<POCCanvas data={this.state.doc.canvas} onChange={this.handleCanvasUpdate}/>}
                <LeftPanel></LeftPanel>
                <Canvas></Canvas>
            </div>
        )
    }
}

export default Editor;