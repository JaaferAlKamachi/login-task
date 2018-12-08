/*
 * Express Example
 *
 */
const express = require('express');
const app = express();
const Joi = require('joi');
const hello =  require('./hello');
const usersRoutes = require('./routes/user');

app.use(express.json());
app.use(hello);
app.use(express.static('public'));
app.use('/api/user', usersRoutes);




app.listen(3000, () => {
  console.log('Running on port 3000');
})
