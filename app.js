/*
 * Express Example
 *
 */
const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const hello =  require('./hello');
const usersRoutes = require('./routes/user');

app.use(express.json());
app.use(hello);
app.use(express.static('public'));

app.use((req, res, next) => {
try {
  let payload = jwt.verify(req.body.token, 'secret123');
  res.send(payload);
} catch (err) {
res.status(400).send('invalid token');
}

  res.send(v);
next();
});


app.use('/api/user', usersRoutes);





app.get('/', (req, res) => {
  const token = jwt.sign({"name":"Hamdon", "age": 24}, 'key');
  res.send(token);
})


app.listen(3000, () => {
  console.log('Running on port 3000');
})
