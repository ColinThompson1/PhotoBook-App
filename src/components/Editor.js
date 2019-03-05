import React from "react";
import POCCanvas from "../poc/POCCanvas";
import socket from "../connection";

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doc: {
                canvas: {}
            }
        };

        this.handleCanvasUpdate = this.handleCanvasUpdate.bind(this);
    }


    componentDidMount() {
        this.setupSocket();
    }

    componentWillUnmount() {
        console.log('disconnecting')
    }

    setupSocket() {
        socket.on('connect', () => console.log("connected"));
        socket.on('disconnect', () => console.log("disconnected"));
        socket.on('connect_error', () => alert("Could Not Connect To Server"));
        socket.on('connect_timeout', () => alert("Could Not Connect To Server"));
    }

    handleCanvasUpdate(canvas) {
        const doc = {...this.state.doc, canvas: canvas};
        this.setState({...this.state, doc: doc});
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