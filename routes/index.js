var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,test: 'Instragram'});
});

router.get('/cate/:cate', function(req, res, next) {
  var cate = req.params.cate;
  res.render('index', { title: 'Express' ,test: 'Instragram'});
});

router.get('/search/:search', function(req, res, next) {
  var search = req.params.search;
  res.render('index', { title: 'Express' ,test: 'Instragram'});
});

module.exports = router;
