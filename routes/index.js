var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JustModules' });
});

router.get('/views/partials/:name', function(req, res) {
  console.log("exports.partials");
  var name = req.params.name;
  console.log(name);
  res.render('partials/' + name);
});

module.exports = router;
