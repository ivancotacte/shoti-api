import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const client = new MongoClient(process.env.MONGO_URI);

let videosData = [];

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database.');
        await refreshData();
        setInterval(refreshData, 1000 * 60 * 1);
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error connecting to the database', error: error.message });
    }
}

async function writeData(collection, data) {
    try {
        const database = client.db(process.env.DB_NAME);
        const col = database.collection(collection);
        return await col.insertOne(data);
    } catch (error) {
        console.error('Error occurred while writing data:', error);
    }
}

async function readData(collection) {
    try {
        const database = client.db(process.env.DB_NAME);
        const col = database.collection(collection);
        return await col.find().toArray();
    } catch (error) {
        console.error('Error occurred while reading data:', error);
    }
}

async function refreshData() {
    try {
        videosData = await readData('videos');
        console.log('Data refreshed.');
    } catch (error) {
        console.error('Error occurred while refreshing data:', error);
    }
}

export { connectToDatabase, writeData, readData, refreshData };