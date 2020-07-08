const express = require('express');
const path = require('path');
const cors = require('cors');

const services = require('./services');
const userRouter = require('./routes/users')(services.userService, services.cryptService);
const router = require('./routes')(userRouter, services.jwtService);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

module.exports = app;
