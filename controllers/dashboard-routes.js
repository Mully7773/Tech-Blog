const router = require('express').Router();
const session = require('express-session');
const response = require('express/lib/response');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth.js');



  router.get('/', async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        raw: true,
        order: [["id", "DESC"]],
        include: 
          {
            model: User,
            attributes: ['username']
          },
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('all-posts-admin', { 
        layout: 'dashboard',
        posts,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


//for new posts
  router.get('/new', (req, res) => {
    res.render('new-post');
  });

  module.exports = router;