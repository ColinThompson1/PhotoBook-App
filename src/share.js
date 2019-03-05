import sharedb from "sharedb/lib/client";
import socket from "./connection";

export default new sharedb.Connection(socket);