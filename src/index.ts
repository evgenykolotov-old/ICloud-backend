import express from "express";
import mongoose from "mongoose";
/*import config from "config";
import fileUpload from "express-fileupload";
import authRouter from "./routes/auth.routes";
import fileRouter from "./routes/file.routes";*/

const application = express();
const PORT = config.get("serverPort");
//const MONGO_URL = config.get("MongoURL");

/*
application.use(fileUpload({}));
application.use(express.json());
application.use("/api/auth", authRouter);
application.use("/api/file", fileRouter);
*/
const startServer = async () => {
    try {
        /*mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });*/
        application.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {

    }
}

startServer();
