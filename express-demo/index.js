
// load custom middleware function
const logger = require('./middleware/logger');

const home = require('./routes/home');
const courses = require('./routes/courses');

const express = require('express');
const app = express();

// Third party middlwares
const helmet = require('helmet'); // Secures app by setting http headers
const morgan = require('morgan'); // To log http requests


app.use(express.json());
app.use(logger);
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/courses', courses);
app.use('/', home);


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));