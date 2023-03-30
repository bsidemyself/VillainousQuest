const router = require('express').Router();
const homeRouter = require('./home-router');
const apiRouter = require('../controllers/api');
router.use('/api', homeRouter);
router.use('/api', apiRouter);
module.exports = router;
