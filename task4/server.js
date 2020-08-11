// Loading npm modules
const express = require('express');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');

// PATH
//  ENV CONFIG file
const envVarPath = './config/config.env';
// view folder
const viewDirPath = path.join(__dirname, './views');
// public folder
const publicDirPath = path.join(__dirname, './public');

// Loading enviornment variables
require('dotenv').config({ path: envVarPath });

// Loading Routes
const students = require('./routes/students');
const api_students = require('./routes/api_students');

// Loading Database Connection File
const connectDB = require('./config/db');

// Connecting Database
connectDB();

const app = express();

// Parsing URL encoded data
app.use(express.urlencoded({ extended: true }));

// Parse JSON data
app.use(express.json());

// Parse HTML CSS files
app.use(express.static(publicDirPath));

// to use UPDATE and DELETE requests
app.use(methodOverride('_method'));

// EJS view engine
app.set('view engine', 'ejs');

app.set('views', viewDirPath);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.get('/home', (req, res) => {
  res.render(path.join(viewDirPath, 'index.ejs'), { path: req.path });
});

// Routing student requests
app.use('/student', students);

// Routing api requests
app.use('/api/student', api_students);

app.get('/', (req, res) => {
  res.send('This may be an ERROR');
});

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    ` Server running on port ${PORT} in ${process.env.NODE_ENV} mode `.bgGreen
      .black
  )
);
