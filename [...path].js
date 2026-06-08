import app from "./server.js";
import mongoConn from "./db/dbcon.js";

let isConnected = false;

export default async function handler(req, res) {
    if (!isConnected) {
        await mongoConn();
        isConnected = true;
    }

    return app(req, res);
}