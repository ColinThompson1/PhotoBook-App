
export default class OTMessage {

    constructor(op, lastKnownState) {
        this.op = op;
        this.lastKnownState = lastKnownState; // index of last known server state
    }

}