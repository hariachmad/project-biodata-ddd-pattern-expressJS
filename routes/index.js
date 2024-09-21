var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Belum ada index', { title: 'Biodata' });
});

module.exports = router;
