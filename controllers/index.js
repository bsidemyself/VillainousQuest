const router = require('express').Router();
const homeRouter = require('./home-router');
const apiRouter = require('./api');
const userRouter = require('./api/users-router')
router.use('/', homeRouter);
router.use('/', apiRouter);
// router.use('/',userRouter);

module.exports = router;
