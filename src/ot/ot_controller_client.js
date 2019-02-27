import OTMessage from "./message";
import {OTController} from "./ot_controller";

export class OTControllerClient extends OTController {

    constructor() {
        super();
        this.outgoing = null;
        this.bridge = null;
        this.buffer = null;
    }

    generate(op) {
        super.apply(op);

        // Update bridge with path to point where we diverged from server
        if (this.bridge) {
            this.bridge = this.compose(this.bridge, op);
        } else {
            this.bridge = op;
        }

        // Add to pending queue or if sole operation, send.
        if (this.outgoing) {
            if (this.buffer) {
                this.buffer = this.compose(this.buffer, op);
            } else {
                this.buffer = op;
            }
        } else {
            this.outgoing = new OTMessage(op, 0);
            this.send(this.outgoing);
        }
    }

    receive(msg) {
        // Check if our message has been acknowledged or another message
        if (this.outgoing && (msg.op.id === this.outgoing.op.id)) {
            // Our own message
            this.outgoing = new OTMessage(this.buffer, 0); //todo 0
            this.send('edit', this.outgoing)
        } else {

            let [clientP, serverP] = this.transform(this.bridge, msg.op);

            if (this.outgoing) {
                // Update bridge with respect to incoming operation
                this.bridge = clientP;

                // Update buffer with respect to incoming operation
                let [,transformedOp] = this.transform(this.outgoing.op, msg.op);
                let [newBuffer,] = this.transform(this.buffer, transformedOp);
                this.buffer = newBuffer;
            }

            super.apply(serverP)
        }
    }

    setSend(send) {
        this.send = send;
    }

}
