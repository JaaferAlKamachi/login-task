
/*
 * This file handel all /api/user Routes
 *
 */

// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/users');


// Dummy Data just for testing
let users = [
  {'id': 1 , 'name': 'Hamandi', 'cool': false},
  {'id': 2 , 'name': 'Hamdon', 'cool': true},
];


// Getting information
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(result => {
    if(!result){
      res.status(404).send('There is no such user');
    }
    res.send(result);
  }).catch(err => {
    res.status(400).send(err.message)
  });
});


// Adding a new User
router.post('/', (req, res) => {
  // Setting Schema so i can validate it
  const validating = userValidating(req.body);

  if(validating.error){
    res.status(400).send(validating.error.details);
  }else {

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      age: req.body.age
    });

    user.save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });


    res.send('Done');
  }
});


// PUT
router.put('/:id', (req, res) => {
  // Check if the user exist
  let user = users.find(item => item.id === parseInt(req.params.id));
  if(user){
    const validating = userValidating(req.body);
    //  If the validation fails
    if(validating.error){
      res.status(400).send(validating.error.details);
    }else {
      //  If the validation success
        let newUser = {
        'id': user.id,
        'name': req.body.name,
        'cool': req.body.cool == 'true'
      };
      users[users.indexOf(user)] = newUser;
      res.send(users);
    }
  }else{
    res.status(404).send('user not found');
  }
});

router.delete('/:id', (req, res) => {
  User.remove({_id: req.params.id}).then(result => {
    res.send(result)
  }).catch(err => {
    res.status(404).send(err);
  });
});



//  To validate the POST PUT requestes
function userValidating(user) {
  const userSchema = {
    'name': Joi.string().min(3).required(),
    'age': Joi.number().required()
  }
  return Joi.validate(user, userSchema);
}


//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;
