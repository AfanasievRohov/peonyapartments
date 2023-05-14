// const dotenv = require('dotenv'); Стас це тобі на підключення монго
// const mongoose = require('mongoose'); Стас це тобі на підключення монго

process.on("uncaughtException", (err) => {
    //Uncaught Exeprions - problems in sync code a.k.a typos, non declare vars etc
    console.error(err.name, err.message);
    process.exit(1);
})

// dotenv.config({path: './config.env'}); Стас це тобі на підключення монго

const app = require('./app');

// mongoose.connect(process.env.DATABASE_LOCAL, { Стас це тобі на підключення монго
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(() => {
//     console.log("DB connection successful!")
// });

const port = 8000; //process.env.PORT || 8000 Стас це тобі на підключення монго


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
