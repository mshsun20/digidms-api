import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import mongoConn from "./db/dbcon.js";
import authRoutes from "./routes/authRoute.js";
import routes from "./routes/route.js";
dotenv.config({ quiet: true });
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const apienv = process.env.NODE_ENV || 'development';

const portDetails = {
  development: process.env.PORT_DEV || 5052,
  quality: process.env.PORT_QAS || 5051,
  production: process.env.PORT_PRD || 5050,
}
const port = portDetails[apienv] || 5052;

const allowedOrigins = {
  development: [process.env.APP_URL_DEV],
  quality: [process.env.APP_URL_QAS],
  production: [process.env.APP_URL_PRD]
}
const origins = allowedOrigins[apienv] || ['http://localhost:3039'];


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json({ limit: '10000mb' }));
app.use(express.urlencoded({ limit: '10000mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: origins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json({ limit: '10000mb' }));
app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true }));
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Server Running'
  });
});
app.use("/api/auth", authRoutes);
app.use("/api", routes);

export default app;
