const router = require('express').Router();
const { User, Quest } = require('../models');
const withAuth = require('../util/withAuth')
// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });

// router.get('/users-only', withAuth, async (req, res) => {
// try {
//   const data = await User.findByPk(req.session.userId, {
//     attributes: { exclude: ['password'] },
//     include: [{ model: Quest }],
// // To be finished
//   });
//   const user = userData.get({ plain: true });

//   res.render('profile', {
//     ...user,
//     isLoggedIn: true
//   });
// } catch (err) {
//   res.status(500).json(err);
// }
// });

router.get('/', async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ['password'],
        raw: true,
      });
    }
    res.render('home', {
      title: 'Home Page',
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Log-In Page' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign-Up Page' });
});

module.exports = router;
