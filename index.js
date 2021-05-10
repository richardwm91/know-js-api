'use strict';
const express = require('express');
const cors = require('cors');
const config = require('./config');
const noteRoutes = require('./routes/note-routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', noteRoutes.routes)

app.listen(config.port, ()=> console.log('App is listening on http://localhost:' + config.port));