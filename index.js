import app from "./app.js";
import mongoConn from "./db/dbcon.js";

let isConnected = false;

export default async function handler(req, res) {
    await mongoConn();
    req.url = req.url.replace(/^\/api/, "");
    console.log(req.url);
}