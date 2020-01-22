const morgan = require('morgan');
const mongoose = require('mongoose');

const geners = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

const express = require('express');
const app = express();

// Connect to mongoose DB
mongoose.connect('mongodb://localhost/vidly')
	.then(() => console.log('Succesfully connected to Mongo DB...'))
	.catch(err => console.error('Failed to connect to Mongo DB', err));

app.use(express.json());
app.use(morgan('tiny'));

// Use routes
app.use('/api/genres', geners);
app.use('/api/customers', customers);
app.use('/api/movies', movies);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));