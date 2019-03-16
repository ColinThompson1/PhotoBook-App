import sharedb from "sharedb/lib/client";
import socket from "./connection";
import otjson1 from "ot-json1";

sharedb.types.register(otjson1.type);

export default new sharedb.Connection(socket);