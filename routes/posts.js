/*
 * File that handel the posts routes
 */

 /*
  * @TODO this file is not finished
  *
  */

const express = require('express');
const router = express.Router();
const Joi = require('joi');


let posts = [
  {'id': 1 ,
   'title': 'Hamandi',
   'desc': false,
   'numberOfLikes': 0
  },
];
