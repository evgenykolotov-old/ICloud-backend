const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const application = express();
const PORT = config.get("serverPort");
const MONGO_URL = config.get("MongoURL"); 

const startServer = async () => {
    try {
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        application.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {

    }
}

startServer();