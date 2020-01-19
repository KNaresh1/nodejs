const Joi = require('joi');
const morgan = require('morgan')

const geners = require('./routes/geners');

const express = require('express');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/geners', geners);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));