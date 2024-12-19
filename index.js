require('dotenv').config();
const {PORT, DB_URL} = process.env;
const mongoose = require('mongoose');
const app = require('./app.js');



const conn =async () => {
    await mongoose.connect(process.env.DB_URL);

    console.log("conectado a mongoDB")

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

conn();
