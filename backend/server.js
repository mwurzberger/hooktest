const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const shipRoutes = require('./routes/ship');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =	'mongodb://queryUser:moody123@utility:27017/poc';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
// TODO app.use for positions
app.use('/api/ships', shipRoutes);

app.use(function (req, res, next) {
  res.status(404).send('Path not found')
})

app.use((err, req, res, next) => {
    console.log('err', err);
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err,
    });
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));