const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const application = express();
const PORT = config.get("serverPort");

const startServer = () => {
    try {
        application.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {

    }
}

startServer();