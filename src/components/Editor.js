import React from "react";
import POCCanvas from "../poc/POCCanvas";
import share from "../share";

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
        let doc = share.get('testing', '1');
        if (!doc.type) {
            doc.create(this.state, 'ot-json1', {}, () => {
                console.log("Created doc");
                this.subscribeToChanges();
            })
        } else {
            this.subscribeToChanges();
        }
    }

    componentWillUnmount() {

    }

    subscribeToChanges() {
        let query = share.createSubscribeQuery('testing', {});
        update = update.bind(this);
        query.on('ready', update);
        query.on('changed', update);

        function update() {
            const doc = {...this.state.doc, canvas: query.results};
            this.setState({...this.state, doc: doc});
        }
    }


    handleCanvasUpdate(canvas) {
        const doc = {...this.state.doc, canvas: canvas};
        this.setState({...this.state, doc: doc});

        const op = ['canvas', {i: canvas}];
        share.get('testing', '1').submitOp(op)
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