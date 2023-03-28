const router = require('express').Router();
const usersRouter = require('./users-router');
const exampleRouter = require('./example-router');
const commentsrouter = require('./comments-router');
const homerouter = require('./');
const storyrouter = require('./story-router')

router.use('/users', usersRouter);
router.use('/example', exampleRouter);
router.use('/', homerouter);
router.use('/', commentsrouter);



module.exports = router;
