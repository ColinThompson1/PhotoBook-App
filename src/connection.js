import io from "socket.io-client";

export default io(process.env.REACT_APP_DATA_SERVICE, {
    upgrade: false,
    transports: ['websocket']
});