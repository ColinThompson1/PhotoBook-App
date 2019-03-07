import React from "react";
import POCCanvas from "../poc/POCCanvas";
import sharedb from "../sharedb";
import otjson1 from "ot-json1";

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
        this.handleServerUpdate = this.handleServerUpdate.bind(this);
    }


    componentDidMount() {
        this.otdoc = sharedb.get('doc', 'df5c313c-fe9b-4e0d-89ca-bfef2cd38b6b');
        console.log('version1 ' + this.otdoc.version);
        this.otdoc.subscribe();
        this.otdoc.on('op', this.handleServerUpdate)
    }

    componentWillUnmount() {}

    handleServerUpdate() {
        console.log('Updating from op');
        console.log('version2 ' + this.otdoc.version);
        this.setState({...this.state, doc: this.otdoc.data.doc});
    }

    handleCanvasUpdate(canvas) {
        const op = ['doc', 'canvas', [{r: {}}], [{i: canvas}]];
        console.log('version3 ' + this.otdoc.version);
        this.otdoc.submitOp(op)
        console.log('version4 ' + this.otdoc.version);
    }

    render() {
        return (
            <div className="editor">
                <POCCanvas data={this.state.doc.canvas} onChange={this.handleCanvasUpdate}/>
            </div>
        )
    }
}

export default Editor;