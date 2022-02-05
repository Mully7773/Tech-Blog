const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/',  (req, res) => {
    res.render('homepage')
  });


  
router.get('/login',  (req, res) => {
    res.render('login')
  });



  
router.get('/signup',  (req, res) => {
    res.render('signup')
  });



  module.exports = router;