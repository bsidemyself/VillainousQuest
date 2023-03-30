const router = require('express').Router();
const usersRouter = require('./users-router');
const commentsrouter = require('./comments-router');
const homerouter = require('../home-router');
const questrouter = require('./quest-router')

router.use('/users', usersRouter);
// router.use('/', homerouter);
// router.use('/', commentsrouter);
// router.use('/', questrouter);



module.exports = router;
