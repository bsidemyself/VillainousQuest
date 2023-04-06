const router = require('express').Router();
const homeRouter = require('./home-router');
const apiRouter = require('./api');
router.use('/', homeRouter);
router.use('/', apiRouter);

module.exports = router;
