const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all posts
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll()
      res.json(postData)
    } catch (err) {
        res.status(400).json(err);
      }
  })

//Create a new post
  router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
      try {
        const postData = await Post.create({
            title: req.body.title,
            body: req.body.body
        });
    
          res.status(200).json(postData);
    
      } catch (err) {
        res.status(400).json(err);
      }
    });
  
  
    //Delete a post
    router.delete('/:id', withAuth, async (req, res) => {
      try {
        const postData = await Post.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
    
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  
    //update a post via id
    router.put(':/id', async (req, res) => {
      try {
        const updatePost = await Post.update(
          {
            title: req.body.title,
            body: req.body.body
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.status(200).json("Post successfully updated!");
      
      } catch (err) {
        res.status(400).json(err);
      }
    });


module.exports = router;