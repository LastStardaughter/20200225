const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const grads = require('./routes/api/grads');

const app = express();

const db=process.env.DB_CONNECTION;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Connected to MongoDB.");
});

const port=process.env.PORT || 3000;

app.use(express.json());
app.use('/api/grads', grads);
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});