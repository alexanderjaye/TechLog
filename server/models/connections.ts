import * as mongoose from 'mongoose';

function makeNewConnection(uri: string, dbName: string): any {

    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    return db;
}

const mongoURL = process.env.MONGO_URL || '127.0.0.1:27017';
const reportsCollection = process.env.MONGO_REPORTS || 'reports';


export const reportsConnection = makeNewConnection(`mongodb://${mongoURL}/${reportsCollection}`, 'reportsDB');
