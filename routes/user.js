
/*
 * This file handel all /api/user Routes
 *
 */

// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Dummy Data just for testing
let users = [
  {'id': 1 , 'name': 'Hamandi', 'cool': false},
  {'id': 2 , 'name': 'Hamdon', 'cool': true},
];


// Getting information
router.get('/:id', (req, res) => {
  let user = users.find(item => item.id === parseInt(req.params.id));
  if(user){
    res.send(user);
  }else {
    res.status(404).send('User not found');
  }
});


// Adding a new User
router.post('/', (req, res) => {
  // Setting Schema so i can validate it
  const validating = userValidating(req.body);

  if(validating.error){
    res.status(400).send(validating.error.details);
  }else {
    let newUser = {
      'id': users.length + 1,
      'name': req.body.name,
      'cool': req.body.cool == 'true'
    };
    users.push(newUser);
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


//  To validate the POST PUT requestes
function userValidating(user) {
  const userSchema = {
    'name': Joi.string().min(3).required(),
    'cool': Joi.boolean().required()
  }
  return Joi.validate(user, userSchema);
}


//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;
