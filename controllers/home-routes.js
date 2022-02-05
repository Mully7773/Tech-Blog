const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/',  (req, res) => {
    res.render('homepage')
  });



  module.exports = router;