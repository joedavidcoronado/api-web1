const { Client } = require('pg');
require('dotenv').config();

const dbConnection = async () => {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        port: process.env.POSTGRES_PORT,
    });

    await client.connect();
    return client;
}

module.exports = dbConnection;
 