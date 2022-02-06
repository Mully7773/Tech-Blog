const router = require('express').Router();
const { User } = require('../../models');

//User create
router.post('/', async (req, res) => {
  try {
    //   console.log(req.body)
    const userData = await User.create({
        username: req.body.username,
        password: req.body.password
    });

    const currentUser = userData.get({ plain: true })
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.userId = currentUser.id;
      req.session.username = currentUser.username;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//User login
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      const currentUser = userData.get({ plain: true })
      req.session.save(() => {
        req.session.logged_in = true;
        req.session.username = currentUser.username;
        req.session.userId = userData.id;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

//User logout
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


module.exports = router;