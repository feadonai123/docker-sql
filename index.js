require('dotenv/config');
const getAllItems = require('./routes/gettAllItems');
const createItem = require('./routes/createItem');
const deleteItem = require('./routes/deleteItemById');
const db = require('./db.js');

const express = require('express');
const app = express();

app.use(require('body-parser').json());
app.use('/',express.static(__dirname + '/static'));

app.get('/item', getAllItems);
app.post('/item', createItem);
app.delete('/item', deleteItem);

app.listen(process.env.APP_PORT, () => console.log(`Listening on port ${process.env.APP_PORT}`));