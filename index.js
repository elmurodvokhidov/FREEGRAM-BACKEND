const express = require('express');
require('dotenv').config();
const app = express();
require('./start/starter')(app);
require('./config/db')(app);