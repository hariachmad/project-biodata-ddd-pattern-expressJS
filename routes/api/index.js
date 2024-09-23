const express = require('express');
const router = express.Router();
const profileRouter = require('../api/profile')

router.use('/profile',profileRouter);

module.exports = router;