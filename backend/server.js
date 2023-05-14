const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

process.on("uncaughtException", (err) => {
    //Uncaught Exeprions - problems in sync code a.k.a typos, non declare vars etc
    console.error(err.name, err.message);
    process.exit(1);
})

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then(() => console.log('CONNECTED TO DB SUCCESSFUL!'))

const port = process.env.PORT || 8000;


const server = app.listen(port, () => {
    console.log(`App runing on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
    //Unhandled Rejection - problems in async code a.k.a Promises, fetch() etc
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
})
