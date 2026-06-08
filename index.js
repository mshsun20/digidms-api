import app from "./server.js";
import mongoConn from "./db/dbcon.js";

export default async function handler(req, res) {
    await mongoConn();
    req.url = req.url.replace(/^\/api/, "");
    console.log(req.url);
    return app(req, res);
}