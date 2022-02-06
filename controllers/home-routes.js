const router = require('express').Router();
const { DESCRIBE } = require('sequelize/types/lib/query-types');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts
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
      const posts = posts.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('all-posts', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get one post
  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include: {
              model: User,
            }
          },
        {
            model: User,
        }
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('single-post', {
        post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  
router.get('/login',  (req, res) => {
    // if(req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    //}
    res.render('login')
  });

router.get('/signup', (req, res) => {
    // if(req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('signup')
});


  module.exports = router;