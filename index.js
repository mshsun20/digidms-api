import app from "./server.js";
import mongoConn from "./db/dbcon.js";

export default async function handler(req, res) {
    await mongoConn();
    return app(req, res);
}