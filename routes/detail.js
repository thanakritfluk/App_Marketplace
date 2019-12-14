var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('detail', { title: 'detail'});
});

router.get('/:name', function(req, res, next) {
  var name = req.params.name;
  res.render('detail', { title: name});
});
module.exports = router;
