import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import mongoose from 'mongoose';

const dbUrlConn = process.env.ONLN_DBURL
// const dbUrlConn = process.env.OFFLN_DBURL
const apienv = process.env.NODE_ENV || 'development';

let dbUrl='', dbnm=''

switch (apienv) {
    case "development":
        console.log("Development Server");
        dbUrl = `${dbUrlConn}digitcompliancedb?appName=digitcomplianceapp`;
        dbnm = 'digitcompliancedb';
        break;
    case "quality":
        console.log("Quality Server");
        dbUrl = `${dbUrlConn}digitcomplianceqasdb?appName=digitcomplianceapp`;
        dbnm = 'digitcomplianceqasdb';
        break;
    case "production":
        console.log("Production Server");
        dbUrl = `${dbUrlConn}digitcomplianceprddb?appName=digitcomplianceapp`
        dbnm = 'digitcomplianceprddb';
        break;
}

mongoose.set('strictQuery', false); // Disable strict query mode

const mongoConn = async () => {
    try {
        await mongoose.connect(dbUrl, {
            dbName: dbnm,
            retryWrites: true,
            w: 'majority',
            ssl: true,
            maxPoolSize: 1, // Keep per-worker connections low
            minPoolSize: 1
        });
        console.log(`Worker ${process.pid}: DB Successfully Connected...`);
    } catch (error) {
        console.error(error);
        throw new Error('Database connection failed');
    }
}

export default mongoConn;