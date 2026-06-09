import app from "./app.js";
import mongoConn from "./db/dbcon.js";

let isConnected = false;

export default async function handler(req, res) {
    try {

        if (!isConnected) {
            await mongoConn();
            isConnected = true;
        }

        return app(req, res);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}