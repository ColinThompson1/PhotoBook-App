import React from "react";
import POCCanvas from "../poc/POCCanvas";
import conn from "../sharedb";
import LeftPanel from "./LeftPanel";
import Canvas from "./Canvas";
import FirstTemplate from "./FirstTemplate";
import SecondTemplate from "./SecondTemplate";

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
        this.otdoc = conn.get('doc', 'e3be136c-df82-42d5-907f-6ccbbf85c79d');
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
                {/*<POCCanvas data={this.state.doc.canvas} onChange={this.handleCanvasUpdate}/>*/}
                <LeftPanel></LeftPanel>
                <Canvas></Canvas>
              {/* Logic for which template*/}  
              {/*  <FirstTemplate></FirstTemplate> */}
              <SecondTemplate></SecondTemplate>
            </div>
        )
    }
}

export default Editor;